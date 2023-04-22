<template>
  <div class="GotoTop" @click="scrollToTop" @touchend="scrollToTop">
    <img src="../../assets/icon/upload.png" alt="Go Up" />
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.GotoTop {
  position: fixed;
  right: 5rem;
  bottom: 5rem;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: rgb(231, 228, 213);
  & > img {
    opacity: 0.6;
  }
  &:hover {
    background-color: rgb(251, 251, 251);

    cursor: pointer;
    & > img {
      opacity: 0.9;
      //   filter: invert(1.5);
    }
  }
}
</style>
