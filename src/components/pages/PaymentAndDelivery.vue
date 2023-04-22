<template>
  <div class="container">
    <div class="textBox">
      <h3>付款與運送</h3>
      <div class="title">🖤 寄送付款資訊 🖤</div>
      <p class="text">
        交易幣別：新台幣 <br />
        付款方式：線上刷卡/ATM虛擬帳號<br />
        交貨方式：超商取貨單筆訂單金額未滿 1500 元，需負擔運費 70 元，選擇貨到付款需加收10元手續費。
      </p>

      <div class="title">🖤 現貨 / 預購 🖤</div>
      <p class="text">
        Ｑ：我下完單後什麼時候可以出貨？ <br />Ａ：賣場可下標商品包含現貨 / 預購不一定都是有現貨馬上寄出
        商品預購追加須等待7-20天(不包含假日) 可等待上述追加期者再下單！！！請勿下單後催促出貨
        有時候也會因不可抗拒因素造成斷貨或延遲出貨 如貨運延遲或工廠面料短缺。
        已超過追加天數我們會在您的訂單通知您更換商品或刪除斷貨商品 <br />
      </p>
      <p class="emphasize">[下單前請詳讀以上須知，下單後皆視為認同上述內容 ]</p>
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
}

h3 {
  text-align: center;
  margin: 5rem 0rem;
}

.h3__text {
  padding: 0;
  font-size: 1.5rem;
}

.title {
  font-size: 2rem;
  font-family: 200;
  margin: 2rem 0;
  text-align: center;
}
.text {
  margin: 1rem 0rem 5rem 0rem;
  padding: 0 0 0 4rem;
  font-size: 1.5rem;
  text-align: justify;
  font-weight: 200;
  line-height: 1.75;
}

.emphasize {
  // margin: 1rem auto 5rem auto;
  // padding: 0 0 0 4rem;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;
  display: block;
  background-color: yellowgreen;
}
</style>
