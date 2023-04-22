<template>
  <div class="container">
    <div class="middleBox">
      <div class="footer-category">
        <router-link to="/about">關於我們</router-link>
        <router-link to="/payment">付款與運送</router-link>
        <router-link to="/return">退換貨政策</router-link>
        <router-link to="/privacy">隱私權政策</router-link>
      </div>
      <div class="footer-iconBox">
        <img src="../../assets/icon/instagram.png" alt="" />
        <img src="../../assets/icon/line.png" alt="" />
      </div>
      <div class="footer-copyright">©2023 www.justpractice.co</div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 10rem;
  background-color: rgb(242, 240, 240);
  display: flex;
  align-items: center;
}

.middleBox {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.footer-category {
  width: 40%;
  //   background-color: blue;

  & > a {
    text-decoration: none;
    font-size: 1.5rem;
    padding: 0 2rem;
    color: rgb(118, 118, 118);
    font-weight: 200;
    &:hover {
      cursor: pointer;
      //   transform: translateY(-3px);
      color: #000;
    }
  }
}
.footer-iconBox {
  width: 10%;
  & > img {
    width: 3rem;
    height: 3rem;
    margin: 0 1rem;
    cursor: pointer;
    filter: contrast(0.9);
  }
}
</style>
