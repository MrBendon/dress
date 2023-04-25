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
      <div class="footer-copyright">
        ©2023 本網頁僅為為練習之用，如有侵權敬請告知，商品之圖片皆來自dress.e網站．
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
@import "../../assets/css/base/mixins";
.container {
  width: 100%;
  height: 10rem;
  background-color: rgb(242, 240, 240);
  display: flex;
  align-items: center;
  @include SmallViewPort {
    flex-direction: column;
    height: max-content;
  }
  @include ViewPort-1280 {
    flex-direction: column;
    height: 10rem;
    justify-content: space-around;
    align-items: center;
  }
}

.middleBox {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @include SmallViewPort {
    flex-direction: column;
  }
  @include iPad {
    flex-direction: row;
    // height: max-content;
  }
  @include ViewPort-1280 {
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
  }
}
.footer-category {
  width: 40%;
  @include SmallViewPort {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }
  @include iPad {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }
  @include ViewPort-1280 {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  & > a {
    text-decoration: none;
    font-size: 1.5rem;
    padding: 0 2rem;
    color: rgb(118, 118, 118);
    font-weight: 200;

    @include SmallViewPort {
      padding: 1rem 2rem;
    }
    &:hover {
      cursor: pointer;
      //   transform: translateY(-3px);
      color: #000;
    }
  }
}
.footer-iconBox {
  width: 10%;

  @include SmallViewPort {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 1rem 0;
  }
  & > img {
    width: 3rem;
    height: 3rem;
    margin: 0 1rem;
    cursor: pointer;
    filter: contrast(0.9);
  }
}

.footer-copyright {
  width: 30%;
  @include SmallViewPort {
    margin-top: 1rem;
    width: 100%;
  }
  @include iPad {
    margin-top: 0rem;
    width: 30%;
  }
}
</style>
