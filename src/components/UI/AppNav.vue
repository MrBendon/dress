<template>
  <nav class="navContainer">
    <div class="Box">
      <left-nav-button class="left"></left-nav-button>
      <login-button></login-button>
      <!-- <router-link to="/buy"></router-link> -->
      <buy-cart-button></buy-cart-button>
    </div>
  </nav>
</template>

<script>
import LeftNavButton from "./LeftNavButton.vue";
import BuyCartButton from "./BuyCartButton.vue";
import LoginButton from "./LoginButton.vue";

export default {
  components: {
    LeftNavButton,
    BuyCartButton,
    LoginButton,
  },
};
</script>

<style lang="scss" scoped>
.navContainer {
  position: fixed;
  padding: 1.5rem 0rem;
  width: 100%;
  height: 8vh;
  z-index: 100;
  background-color: rgb(239, 239, 239);
}

.Box {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}

.Box :first-child {
  // margin-left: 5rem;
  margin-right: auto;
}
</style>
