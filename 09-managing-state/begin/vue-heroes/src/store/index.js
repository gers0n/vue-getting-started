import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared/';
import { GET_HEROES } from './mutation-types';

Vue.use(Vuex);

const state = {
  heroes: [],
};
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
};
const actions = {
  async getHeroes({ commit }) {
    // const heroes = await dataService.getHeroes();
    let heroes = await dataService.getHeroes();
    /* remove this line */ heroes.push({
      id: 1,
      firstName: 'Hero',
      lastName: 'Smith',
      description: 'hello',
      fullName: 'Hero Smith'
    });
    commit(GET_HEROES, heroes);
  },
};
const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id === id),
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
