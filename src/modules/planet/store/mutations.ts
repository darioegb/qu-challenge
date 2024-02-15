import { MutationTree } from 'vuex';

import { Planet, PlanetState } from 'src/modules/planet/interfaces';

const mutation: MutationTree<PlanetState> = {
  setPlanets(state, payload: Planet[]) {
    state.planets = [...payload];
  },
};

export default mutation;
