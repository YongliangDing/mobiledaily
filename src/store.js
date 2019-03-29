import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '首页'
  },
  getters: {
    getTitle: state => {
      return state.title;
    }
  },
  mutations: {
    editTitle(state, title) {
      state.title = title;
    }
  },
  actions: {

  }
})
