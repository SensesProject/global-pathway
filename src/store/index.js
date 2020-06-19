import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStrategy: 'None',
    currentElement: 0,
    currentSector: 'None',
    highlight: ''
  },
  mutations: {
    changeStrategy (state, strategy) {
      state.currentStrategy = strategy
    },
    changeElement (state, element) {
      state.currentElement = element
    },
    changeSector (state, sector) {
      state.currentSector = sector
    },
    storeHighlight (state, highlight) {
      state.highlight = highlight
    }
  },
  actions: {
    async newStrategy ({ commit }, strategy) {
      commit('changeStrategy', strategy)
    },
    async newElement ({ commit }, element) {
      commit('changeElement', element)
      // console.log(element)
    },
    async newSector ({ commit }, sector) {
      commit('changeSector', sector)
      // console.log(element)
    },
    async newHighlight ({ commit }, highlight) {
      commit('storeHighlight', highlight)
    }
  },
  modules: {
  }
})
