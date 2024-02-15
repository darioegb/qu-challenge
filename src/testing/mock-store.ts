import { createStore } from 'vuex';

import planetsModule from 'src/modules/planet/store';
import { State } from 'src/store';
import { planetsState } from './test-planet-state';

const createVuexStore = (planetsInitState = { ...planetsState }) =>
  createStore<State>({
    modules: {
      planets: {
        ...planetsModule,
        state: { ...planetsInitState },
      },
    },
  });

export default createVuexStore;
