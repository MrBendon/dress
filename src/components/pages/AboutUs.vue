<template>
  <div class="container">
    <div class="textBox">
      <div class="title">關於我們</div>

      <p class="text">公司名稱：阿誇服飾</p>
      <p class="text">統一編號：12345678</p>
      <p class="text">地址：台中市西區ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ</p>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.textBox {
  width: 70%;
  margin: 5rem auto;
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  font-family: 200;
  margin: 2rem 0;
}
.text {
  // margin: 1rem 0rem 5rem 0rem;
  // padding: 0 0 0 4rem;
  font-size: 1.5rem;
  text-align: justify;
  font-weight: 200;
  line-height: 1.75;
}
</style>
