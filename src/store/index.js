import { createStore } from "vuex";
import Products from "./products/products.js";
import membersData from "./membersData/membersData.js";

export default createStore({
  modules: { Products: Products, membersData: membersData },
  state() {
    return {
      nowClickItem: {},
      filterName: "All",
      LoginId: "",
      isShowLeftNav: false,
    };
  },
  actions: {
    setNowClickItem(context, payload) {
      context.commit("setNowClickItem", payload);
    },
    toggleLeftNav(context, payload) {
      context.commit("toggleLeftNav", payload);
    },
    changeFilterName(context, payload) {
      context.commit("changeFilterName", payload);
    },
  },
  mutations: {
    setNowClickItem(state, payload) {
      state.nowClickItem = payload;
    },
    toggleLeftNav(state, payload) {
      state.isShowLeftNav = payload;
    },
    changeFilterName(state, payload) {
      state.filterName = payload;
    },
  },
  getters: {
    getNowClickItem(state) {
      return state.nowClickItem;
    },
    getLeftNavBoolean(state) {
      return state.isShowLeftNav;
    },
    getNowFilterName(state) {
      return state.filterName;
    },
  },
});
