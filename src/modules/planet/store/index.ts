import { Module } from 'vuex';

import { State } from 'src/store';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import { PlanetState } from 'src/modules/planet/interfaces';

const planetsModule: Module<PlanetState, State> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default planetsModule;
