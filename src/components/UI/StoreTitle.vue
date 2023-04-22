<template>
  <div class="titleBox">
    <div class="blank">blank</div>
    <div class="title"><router-link to="/" @click="showSlide"> Dress.E </router-link></div>
  </div>
</template>

<script>
export default {
  methods: {
    showSlide() {
      this.$store.dispatch("changeFilterName", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.titleBox {
  width: 100%;
  height: 25vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.blank {
  padding: 1.5rem 0rem;
  width: 100%;
  height: 8vh;
  /* background-color: blue; */
}

a {
  min-height: 17vh;
  margin: 0 auto;
  font-size: 7vh;
  display: flex;
  align-items: center;
  font-weight: 100;
  text-decoration: none;
  &:link,
  &:visited,
  &:active,
  &:hover {
    color: black;
    font-weight: 100;
  }
}
</style>
