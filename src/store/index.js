import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStrategy: 'None',
    currentElement: 0,
    currentSector: 'None',
    highlight: '',
    country: '',
    meta: false
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
    storeCountry (state, country) {
      state.country = country
    },
    storeHighlight (state, highlight) {
      state.highlight = highlight
    },
    storeMeta (state, meta) {
      state.meta = meta
    }
  },
  actions: {
    async newStrategy ({ commit }, strategy) {
      commit('changeStrategy', strategy)
    },
    async newElement ({ commit }, element) {
      commit('changeElement', element)
    },
    async newSector ({ commit }, sector) {
      commit('changeSector', sector)
    },
    async newCountry ({ commit }, country) {
      commit('storeCountry', country)
    },
    async newHighlight ({ commit }, highlight) {
      commit('storeHighlight', highlight)
    },
    async metaToggle ({ commit }, meta) {
      commit('storeMeta', meta)
    }
  },
  modules: {
  }
})
