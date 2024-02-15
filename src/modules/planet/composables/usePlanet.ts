import { computed } from 'vue';
import { useStore } from 'vuex';

import { State, storeKey } from 'src/store';
import { Planet, PlanetResponse } from 'src/modules/planet/interfaces';
import { RequestGrid } from 'src/interfaces';

export const usePlanet = (): PlanetResponse => {
  const store = useStore<State>(storeKey);

  return {
    //  State
    planets: computed(() => store.state.planets.planets),

    // Actions
    getPlanets: (requestGrid: RequestGrid<Planet>) =>
      store.dispatch('planets/getPlanets', requestGrid),
  };
};
