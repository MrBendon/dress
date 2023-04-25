export default {
  namespaced: true,
  state() {
    return {
      AllmembersData: [
        { UserId: "test111", Pw: "123456", mytracking: [], mybuycart: [] },
        { UserId: "test222", Pw: "123456", mytracking: [], mybuycart: [] },
      ],
      membersData: { UserId: "test111", Pw: "123456", mytracking: [], mybuycart: [] },
    };
  },
  actions: {
    LogOutAndSaveData(context, payload) {
      context.commit("SaveData", payload);
    },
    setNowActiveMembersData(context, payload) {
      context.commit("setNowActiveMembersData", payload);
    },
    AddItemToMyBuyCart(context, payload) {
      const haveSameItem = context.state.membersData.mybuycart.some((el) => el.id === payload.id);
      const SameItemAndHaveSameColor = context.state.membersData.mybuycart
        .find((el) => el.id === payload.id)
        ?.color.includes(payload.color);
      const SameItemAndHaveSameSzie = context.state.membersData.mybuycart
        .find((el) => el.id === payload.id)
        ?.size.includes(payload.size);
      // console.log(SameItemAndHaveSameColor, SameItemAndHaveSameSzie);
      if (haveSameItem && SameItemAndHaveSameColor && SameItemAndHaveSameSzie) {
        context.commit("JustPlusQuantity", payload);
      } else {
        context.commit("setItemToMyBuyCart", payload);
      }
    },
    JustPlusOneQuantity(context, payload) {
      context.commit("JustPlusQuantity", payload);
    },
    JustMinusOneQuantity(context, payload) {
      const WannaMinusItemIndex = context.state.membersData.mybuycart.findIndex(
        (el) => el.id === payload.id && el.color === payload.color && el.size === payload.size
      );
      if (context.state.membersData.mybuycart[WannaMinusItemIndex].quantity === 1) {
        context.commit("deleteItem", payload);
      } else {
        context.commit("JustMinusQuantity", payload);
      }
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
    SaveData(state, payload) {
      const ToBeOverWriteData = state.AllmembersData.find((el) => el.UserId === payload);
      ToBeOverWriteData.mytracking = state.membersData.mytracking;
      ToBeOverWriteData.mybuycart = state.membersData.mybuycart;
      // state.membersData = {};
    },
    setNowActiveMembersData(state, payload) {
      state.membersData = state.AllmembersData.find((el) => el.UserId === payload);
    },
    JustMinusQuantity(state, payload) {
      const WannaDeleteItemIndex = state.membersData.mybuycart.findIndex(
        (el) => el.id === payload.id && el.color === payload.color && el.size === payload.size
      );

      state.membersData.mybuycart[WannaDeleteItemIndex].quantity =
        state.membersData.mybuycart[WannaDeleteItemIndex].quantity - payload.quantity;
    },

    JustPlusQuantity(state, payload) {
      const WannaDeleteItemIndex = state.membersData.mybuycart.findIndex(
        (el) => el.id === payload.id && el.color === payload.color && el.size === payload.size
      );
      state.membersData.mybuycart[WannaDeleteItemIndex].quantity =
        state.membersData.mybuycart[WannaDeleteItemIndex].quantity + payload.quantity;
    },
    setItemToMyBuyCart(state, payload) {
      state.membersData.mybuycart.push(payload);
    },
    deleteItem(state, payload) {
      // state.membersData.mybuycart = state.membersData.mybuycart.filter((el) => el.id !== payload.id);
      const WannaDeleteItemIndex = state.membersData.mybuycart.findIndex(
        (el) => el.id === payload.id && el.color === payload.color && el.size === payload.size
      );
      state.membersData.mybuycart.splice(WannaDeleteItemIndex, 1);
    },
    setItemToMyTracking(state, payload) {
      state.membersData.mytracking.push(payload);
    },
    removeItemFromMyTracking(state, payload) {
      state.membersData.mytracking = state.membersData.mytracking.filter((el) => el !== payload);
      // console.log(state.membersData.mytracking);
    },
  },
  getters: {
    queryAllMembers(state) {
      // const User = this.$store.getters.getLoginId;
      return state.AllmembersData;
    },
    queryMyBuyCart(state) {
      // const User = this.$store.getters.getLoginId;
      return state.membersData.mybuycart;
    },
    queryMyTracking(state) {
      // const User = this.$store.getters.getLoginId;
      return state.membersData.mytracking;
    },
  },
};
