import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import settings from './modules/settings'
import user from './modules/user'
import game from './modules/game'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    user,
    game
  },
  getters
})

export default store
