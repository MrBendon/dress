<template>
  <router-link to="/buycart" class="buycartBox">
    <span>購物車</span>
    <img src="../../assets/icon/shopping-cart.png" alt="buy cart icon" />
    <div class="ItemNumber">{{ CountItemNum }}</div>
  </router-link>
</template>

<script>
export default {
  computed: {
    CountItemNum() {
      if (this.$store.getters["membersData/queryMyBuyCart"].length === 0) {
        return 0;
      } else {
        const All = this.$store.getters["membersData/queryMyBuyCart"];
        const TotalQuantity = All.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0);
        return TotalQuantity;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base/variables";
.buycartBox,
a {
  position: relative;
  width: 15rem;
  height: 4rem;
  // border: 1px solid black;
  // border-radius: 30px;
  display: flex;
  padding: 0 3rem;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &:link,
  &:active,
  &:visited {
    color: black;
  }

  &:hover {
    background-color: $background-color-dark-grey;
  }

  &:hover > span {
    color: white;
  }
  &:hover > img {
    filter: invert(1);
  }

  & > span {
    font-size: 1.75rem;
    font-weight: 200;
  }

  & > img {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.ItemNumber {
  font-size: 1.5rem;
  padding: 0rem 0.5rem;
  color: white;
  background-color: red;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 5%;
  right: 10%;
  z-index: 5;
  border-radius: 50%;
}
</style>
