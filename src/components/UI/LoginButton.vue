<template>
  <div class="LoginButton">會員登入</div>
</template>

<script></script>

<style lang="scss" scoped>
@import "../../assets/css/base/variables";
@import "../../assets/css/base/mixins";
.LoginButton {
  width: 15rem;
  height: 4rem;
  cursor: pointer;
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;

  @include SmallViewPort {
    width: 10rem;
  }

  &:hover {
    color: white;
    background-color: $background-color-dark-grey;
  }
}
</style>
