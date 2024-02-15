import { ActionTree } from 'vuex';

import { State } from 'src/store';
import { Planet, PlanetState } from 'src/modules/planet/interfaces';
import { useAxios } from 'src/composables';
import { AxiosResponse, HttpConfig, RequestGrid } from 'src/interfaces';
import { createHttpParams } from 'src/utils';

const resourceUrl = 'planets';

const actions: ActionTree<PlanetState, State> = {
  async getPlanets({ commit }, payload: RequestGrid<Planet>) {
    const httpConfig: HttpConfig = {
      params: createHttpParams<Planet>(payload),
    };
    const initialRequest = useAxios<Planet[]>({
      url: resourceUrl,
      method: 'get',
      config: httpConfig,
    });

    await initialRequest.exec();
    const planets =
      !initialRequest.data || initialRequest.isError.value
        ? []
        : initialRequest.data.value;

    const numberOfPagesLeft =
      initialRequest.count?.value &&
      Math.ceil((initialRequest.count.value - 1) / 10);

    if (numberOfPagesLeft) {
      const { pagination, filter } = payload;
      const requests: AxiosResponse<Planet[]>[] = [];

      for (let i = 2; i <= numberOfPagesLeft; i++) {
        const request = useAxios<Planet[]>({
          url: resourceUrl,
          method: 'get',
          config: {
            params: createHttpParams<Planet>({
              pagination: { ...pagination, page: i },
              filter,
            }),
          },
        });

        requests.push(request);
      }

      const responses = await Promise.all(
        requests.map((request) => request.exec()),
      );

      responses.forEach((_, index) => {
        const data = requests[index].data;
        data && planets.push(...data.value);
      });
    }

    commit('setPlanets', planets);
    return initialRequest.count?.value;
  },
};

export default actions;
