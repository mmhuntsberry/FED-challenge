import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
    viewLayout: {
      isGrid: true
    }
  },

  actions: {}
});
