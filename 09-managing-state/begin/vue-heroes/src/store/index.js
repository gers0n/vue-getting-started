import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared/';
import {
  GET_HEROES,
  ADD_HERO,
  DELETE_HERO,
  UPDATE_HERO,
} from './mutation-types';

Vue.use(Vuex);

const state = {
  heroes: [],
};
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HERO](state, hero) {
    state.heroes.push(hero);
  },
  [DELETE_HERO](state, heroId) {
    state.heroes = [...state.heroes.filter(h => h.id !== heroId)];
  },
  [UPDATE_HERO](state, hero) {
    let i = state.heroes.findIndex(h => h.id === hero.id);
    state.heroes.splice(i, 1, hero);
  },
};
const actions = {
  async getHeroesAction({ commit }) {
    // const heroes = await dataService.getHeroes();
    let heroes = await dataService.getHeroes();
    /* remove this line */ heroes.push({
      id: 1,
      firstName: 'Hero',
      lastName: 'Smith',
      description: 'hello',
      fullName: 'Hero Smith',
    });
    commit(GET_HEROES, heroes);
  },
  async addHeroAction({ commit }, hero) {
    let addedHero = await dataService.addHero(hero);
    commit(ADD_HERO, addedHero);
  },
  async deleteHeroAction({ commit }, hero) {
    let heroId = await dataService.deleteHero(hero);
    commit(DELETE_HERO, heroId);
  },
  async updateHeroAction({ commit }, hero) {
    const h = await dataService.updateHero(hero);
    commit(UPDATE_HERO, h);
  },
};
const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id === id),
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters,
});
