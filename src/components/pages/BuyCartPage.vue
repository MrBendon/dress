<template>
  <div class="container">
    <div class="buycart">
      <div class="title">購物車</div>
      <div class="nav">
        <div class="title__setting"></div>
        <div class="title__itemname">商品資料</div>
        <div class="title__singleprice">單價</div>
        <div class="title__quantity">數量</div>
        <div class="title__SingleItemTotal">小計</div>
      </div>
      <ul class="detail">
        <li class="itemBox" v-for="item in MyBuyCart" :key="item.id">
          <div class="deleteIcon" @click="deleteBtn(item.id)" @touchend="deleteBtn(item.id)">
            <img src="../../assets/icon/delete.png" alt="" />
          </div>
          <div class="itemPic">
            <img :src="require(`../../assets/img/products/${item.id}.webp`)" alt="" />
          </div>
          <div class="descriptionBox">
            <div class="item__description">{{ item.description }}</div>
            <div class="color">顏色：{{ item.color }}</div>
            <div class="size">尺寸：{{ item.size }}</div>
          </div>
          <div class="singleprice">NT ${{ item.price }}</div>
          <div class="select">{{ item.quantity }}</div>
          <div class="itemTotal">NT ${{ item.price * item.quantity }}</div>
        </li>
      </ul>
      <div class="totalBox">
        <div class="total">
          共<span class="emphasize">{{ CountItemNum }}</span
          >項商品，<span class="emphasize">NT$ {{ CountTotalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    MyBuyCart() {
      return this.$store.getters["membersData/queryMyBuyCart"];
    },
    CountItemNum() {
      if (this.$store.getters["membersData/queryMyBuyCart"].length === 0) {
        return 0;
      } else {
        const All = this.$store.getters["membersData/queryMyBuyCart"];
        const TotalQuantity = All.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0);
        return TotalQuantity;
      }
    },
    CountTotalPrice() {
      if (this.$store.getters["membersData/queryMyBuyCart"].length === 0) {
        return 0;
      } else {
        const All = this.$store.getters["membersData/queryMyBuyCart"];
        const TotalPrice = All.reduce((acc, cur) => {
          return acc + cur.quantity * cur.price;
        }, 0);
        return TotalPrice;
      }
    },
  },
  methods: {
    deleteBtn(id) {
      // console.log(id);
      this.$store.dispatch("membersData/deleteItemFromBuyCart", id);
    },
  },
  mounted() {
    this.$store.dispatch("changeFilterName", "buy");
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 3rem auto;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buycart {
  width: 100%;
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;
}
.title {
  font-size: 3rem;
  font-weight: 200;
  margin: 5rem 0;
}

.nav {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 6fr 2fr 1.5fr 2fr;
  justify-items: center;
  background-color: gray;
  font-size: 3rem;
}

.detail {
  width: 100%;
  //   background-color: yellowgreen;
}

.deleteIcon {
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}

.itemBox {
  display: grid;
  height: 15rem;
  grid-template-columns: 0.5fr 1.25fr 4.75fr 2fr 1.5fr 2fr;
  justify-items: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 200;
  border-top: 1px solid ghostwhite;
  border-bottom: 1px solid ghostwhite;
}

.itemPic {
  //   max-width: 90%;
  max-height: 90%;
  & > img {
    max-height: 13rem;
  }
}

.descriptionBox {
  justify-self: start;
  padding: 0 3rem;
  font-size: 2.5rem;
  font-weight: 200;
}
.item__description {
  padding: 1.5rem 0;
}

.select {
  width: 5rem;
  text-align: center;
  cursor: pointer;
}

.totalBox {
  width: 100%;
  display: flex;
  justify-content: end;
  margin: 1rem 0;
  padding: 0 1rem;
}
.total {
  font-size: 1.75rem;
  color: grey;
  font-weight: 200;
}

.emphasize {
  font-size: 2.25rem;
  font-weight: 400;
  color: rgb(235, 67, 21);
}
</style>
