<template>
  <teleport to="body">
    <div v-if="isShowContainer" class="container">
      <div class="title"><slot name="title">預設title</slot></div>
      <div class="icon"></div>
      <div class="message"><slot name="message">預設massage</slot></div>
      <div class="comfirm" @click="closeShowMessage" @touchend="closeShowMessage">確認</div>
    </div>
  </teleport>
</template>
<script>
export default {
  computed: {
    isShowContainer() {
      return this.$store.getters.getShowMessage;
    },
  },
  methods: {
    closeShowMessage() {
      this.$store.dispatch("setShowMessage", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  border-radius: 12px;
  box-shadow: 12px 12px 16px -3px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 12px 12px 16px -3px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 12px 12px 16px -3px rgba(0, 0, 0, 0.41);
}

.title {
  font-size: 2.5rem;
  margin: 1rem 0 1.5rem 0;
}

.message {
  font-size: 1.75rem;
  font-weight: 200;
  margin: 1rem 0;
}

.comfirm {
  font-size: 1.75rem;
  width: 15rem;
  background-color: grey;
  color: white;
  cursor: pointer;
  text-align: center;
  margin: 1rem 0;
  transition: all 0.25s;
  &:hover {
    background-color: rgba(128, 128, 128, 0.611);
    color: white;
  }
}
</style>
