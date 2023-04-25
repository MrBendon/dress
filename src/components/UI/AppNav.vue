<template>
  <nav class="navContainer">
    <div class="Box">
      <left-nav-button class="left"></left-nav-button>
      <login-button v-if="!alreadyLogin" @click="gotoLoginPage"></login-button>
      <div v-if="alreadyLogin">Hi,{{ Username }} <span class="logout" @click="logOut">登出</span></div>
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
  computed: {
    Username() {
      return this.$store.getters.getLoginId;
    },
    alreadyLogin() {
      return this.$store.getters.getLoginId !== "" ? true : false;
    },
  },
  methods: {
    gotoLoginPage() {
      this.$store.dispatch("changeWannaLogin", true);
      this.$router.push("/login");
    },
    logOut() {
      const logOutId = this.$store.getters.getLoginId;
      console.log(logOutId);
      this.$store.dispatch("membersData/LogOutAndSaveData", logOutId);
      this.$store.dispatch("setLogout");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base/mixins";
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

  @include SmallViewPort {
    width: 80%;
  }
  @include iPad {
    width: 70%;
  }
}

.Box :first-child {
  // margin-left: 5rem;
  margin-right: auto;
}

.logout {
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
