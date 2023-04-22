export default {
  namespaced: true,
  state() {
    return {
      membersData: { Id: "test123", mytracking: [], mybuycart: [] },
    };
  },
  actions: {
    AddItemToMyBuyCart(context, payload) {
      context.commit("setItemToMyBuyCart", payload);
    },
    deleteItemFromBuyCart(context, payload) {
      context.commit("deleteItem", payload);
    },
    AddItemToMyTracking(context, payload) {
      context.commit("setItemToMyTracking", payload);
    },
    RemoveItemFromMyTracking(context, payload) {
      context.commit("removeItemFromMyTracking", payload);
    },
  },
  mutations: {
    setItemToMyBuyCart(state, payload) {
      state.membersData.mybuycart.push(payload);
      // console.log(state.membersData.mybuycart);
    },
    deleteItem(state, payload) {
      state.membersData.mybuycart = state.membersData.mybuycart.filter((el) => el.id !== payload);
    },
    setItemToMyTracking(state, payload) {
      state.membersData.mytracking.push(payload);
    },
    removeItemFromMyTracking(state, payload) {
      state.membersData.mytracking = state.membersData.mytracking.filter((el) => el !== payload);
      console.log(state.membersData.mytracking);
    },
  },
  getters: {
    queryMyBuyCart(state) {
      return state.membersData.mybuycart;
    },
    queryMyTracking(state) {
      return state.membersData.mytracking;
    },
  },
};
