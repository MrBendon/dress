<template>
  <div class="buttonBox" @click="showLeftNav" @touchend="showLeftNav">
    <div class="left-nav-button"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    showLeftNav() {
      this.$store.dispatch("toggleLeftNav", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonBox {
  position: relative;
  width: 4rem;
  height: 4rem;
  // border: 1px solid rgb(181, 181, 181);
  border-radius: 3px;
  cursor: pointer;
}

.left-nav-button {
  position: relative;
  width: 3.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid grey;
  &::before {
    content: "";
    position: absolute;
    width: 3.3rem;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    // z-index: 1;
    border: 1px solid grey;
  }
  &::after {
    content: "";
    position: absolute;
    width: 3.3rem;
    top: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    // z-index: 1;
    border: 1px solid grey;
    transition: all 0.25s;

    &:hove {
      top: 1.5rem;
    }
  }
}
</style>
