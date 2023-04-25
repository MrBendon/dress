import { createStore } from "vuex";
import Products from "./products/products.js";
import membersData from "./membersData/membersData.js";

export default createStore({
  modules: { Products: Products, membersData: membersData },
  state() {
    return {
      nowClickItem: {},
      filterName: "",
      LoginId: "",
      isShowLeftNav: false,
      wannaLogin: false,
      isShowMessage: false,
    };
  },
  actions: {
    setLogout(context) {
      context.commit("setLogout");
    },
    setLoginId(context, payload) {
      context.commit("setLoginId", payload);
    },
    setShowMessage(context, payload) {
      context.commit("setShowMessage", payload);
    },
    setNowClickItem(context, payload) {
      context.commit("setNowClickItem", payload);
    },
    toggleLeftNav(context, payload) {
      context.commit("toggleLeftNav", payload);
    },
    changeFilterName(context, payload) {
      context.commit("changeFilterName", payload);
    },
    changeWannaLogin(context, payload) {
      context.state.wannaLogin = payload;
    },
  },
  mutations: {
    setLogout(state) {
      state.filterName = "";
      state.LoginId = "";
      state.nowClickItem = {};
      state.isShowLeftNav = state.wannaLogin = state.isShowMessage = false;
    },
    setLoginId(state, payload) {
      state.LoginId = payload;
    },
    setShowMessage(state, payload) {
      state.isShowMessage = payload;
    },
    setNowClickItem(state, payload) {
      state.nowClickItem = payload;
    },
    toggleLeftNav(state, payload) {
      state.isShowLeftNav = payload;
    },
    changeFilterName(state, payload) {
      state.filterName = payload;
    },
    changeWannaLogin(state, payload) {
      state.wannaLogin = payload;
    },
  },
  getters: {
    getLoginId(state) {
      return state.LoginId;
    },
    getShowMessage(state) {
      return state.isShowMessage;
    },
    getNowClickItem(state) {
      return state.nowClickItem;
    },
    getLeftNavBoolean(state) {
      return state.isShowLeftNav;
    },
    getNowFilterName(state) {
      return state.filterName;
    },
    getWannaLoginBoolean(state) {
      return state.wannaLogin;
    },
  },
});
