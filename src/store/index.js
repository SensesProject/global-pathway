import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStrategy: 'None',
    currentElement: 0
  },
  mutations: {
    changeStrategy (state, strategy) {
      state.currentStrategy = strategy
    },
    changeElement (state, element) {
      state.currentElement = element
    }
  },
  actions: {
    async newStrategy ({ commit }, strategy) {
      commit('changeStrategy', strategy)
    },
    async newElement ({ commit }, element) {
      commit('changeElement', element)
      console.log(element)
    }
  },
  modules: {
  }
})
