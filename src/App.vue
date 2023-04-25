<template>
  <div class="app">
    <div v-if="showLeftNav" class="LeftNavbackground" @click="closeLeftNav"></div>
    <app-nav></app-nav>
    <div class="baseline"></div>
    <store-title class="basediv"></store-title>
    <slide-show v-if="showSlide && !ShowCategoryNavBar"></slide-show>
    <category-title v-if="!ShowCategoryNavBar" @click="changeCategory"></category-title>
    <transition name="leftnav">
      <left-nav v-if="showLeftNav" class="left-nav"></left-nav>
    </transition>
    <!-- <router-link to="/">about</router-link> -->
    <!-- <main-page-products></main-page-products> -->

    <router-view></router-view>

    <page-footer></page-footer>
    <go-up class="GoUpBtn hidden"></go-up>
  </div>
</template>

<script>
import AppNav from "./components/UI/AppNav.vue";
import StoreTitle from "./components/UI/StoreTitle.vue";
import CategoryTitle from "./components/UI/CategoryTitle.vue";
import LeftNav from "./components/UI/LeftNav.vue";
import SlideShow from "./components/UI/SlideShow.vue";
// import MainPageProducts from "./components/pages/MainPageProducts.vue";

export default {
  components: {
    AppNav,
    StoreTitle,
    CategoryTitle,
    LeftNav,
    SlideShow,
    // MainPageProducts,
  },
  data() {
    return {};
  },
  computed: {
    ShowCategoryNavBar() {
      return this.$store.getters.getWannaLoginBoolean;
    },
    showLeftNav() {
      return this.$store.getters.getLeftNavBoolean;
    },
    showSlide() {
      if (this.$store.getters.getNowFilterName === "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    closeLeftNav(e) {
      console.log(e.target.getAttribute("class"));
      const className = e.target.getAttribute("class");
      if (className.includes("buttonBox") || className.includes("left")) return;
      this.$store.dispatch("toggleLeftNav", false);
    },
    changeCategory(e) {
      if (!e.target.getAttribute("dataName")) return;
      const categoryName = e.target.getAttribute("dataName");
      console.log(categoryName);
      this.$store.dispatch("changeFilterName", categoryName);
    },
  },
  mounted() {
    // const GoUpObserver = new IntersectionObserver();
    ////////////////////////////////////////////////
    const basediv = document.querySelector(".basediv");
    const GoUpBtn = document.querySelector(".GoUpBtn");
    // console.log(basediv, GoUpBtn);
    const observerOption = {
      root: null,
      threshold: 0.6,
    };
    const BacktoTopObserver = new IntersectionObserver(function (info) {
      // console.log(info);
      if (!info[0].isIntersecting) {
        GoUpBtn.classList.remove("hidden");
      } else {
        GoUpBtn.classList.add("hidden");
      }
    }, observerOption);
    BacktoTopObserver.observe(basediv);
    ///////////////////////////////////////////////
  },
  unmounted() {
    // BacktoTopObserver.unobserve(basediv)
  },
};
</script>

<style lang="scss">
@import "./assets/css/scssMain.scss";

.app {
  min-height: 100vh;
  // background-color: blue;
  position: relative;
}

.LeftNavbackground {
  position: absolute;
  top: 0;
  z-index: 199;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  filter: blur(1.2);
}

.leftnav-enter-from,
.leftnav-leave-to {
  transform: translateX(-100%);
}
.leftnav-enter-to,
.leftnav-leave-from {
  transform: translateX(0);
}

.leftnav-enter-active,
.leftnav-leave-active {
  transition: all 0.75s;
}

.hidden {
  display: none;
}
</style>
