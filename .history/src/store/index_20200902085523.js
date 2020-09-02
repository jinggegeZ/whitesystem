import Vue from "vue";
import Vuex from "vuex";
import user from "./user/user";
import order from "./order/order"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    order
  }
});
