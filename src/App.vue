<template>
  <div class="app">
    <div v-if="showLeftNav" class="LeftNavbackground" @click="closeLeftNav"></div>
    <app-nav></app-nav>
    <store-title></store-title>
    <slide-show v-if="showSlide"></slide-show>
    <category-title @click="changeCategory"></category-title>
    <transition name="leftnav">
      <left-nav v-if="showLeftNav" class="left-nav"></left-nav>
    </transition>
    <!-- <router-link to="/">about</router-link> -->
    <!-- <main-page-products></main-page-products> -->

    <router-view></router-view>

    <page-footer></page-footer>
    <go-up></go-up>
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
    // const observerOption = {
    //   root: null,
    //   threshold: 0.6,
    // };
    // const BacktoTopObserver = new IntersectionObserver(function (info) {
    //   const result = info[0].isIntersecting.toString();
    //   if (result === "false") {
    //     BackTopBtn.classList.remove("hidden");
    //   } else {
    //     BackTopBtn.classList.add("hidden");
    //   }
    // }, observerOption);
    // BacktoTopObserver.observe(navBarBaseline);
    ///////////////////////////////////////////////
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
</style>
