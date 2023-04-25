}
<template>
  <div class="container">
    <div class="buycart">
      <div class="title">購物車</div>
      <div v-if="isCartEmpty" class="empty">
        <img src="../../assets/icon/shopping-cart.png" alt="" />
        <div class="text">您的購物車中目前沒有商品</div>
        <div class="goshopping" @click="gotoHomePage">回到首頁</div>
      </div>
      <div v-if="!isCartEmpty" class="nav">
        <div class="title__setting"></div>
        <div class="title__itemname">商品資料</div>
        <div class="title__singleprice">單價</div>
        <div class="title__quantity">數量</div>
        <div class="title__SingleItemTotal">小計</div>
      </div>
      <ul class="detail">
        <li class="itemBox" v-for="item in MyBuyCart" :key="item.id">
          <div class="deleteIcon" @click="deleteBtn(item)" @touchend="deleteBtn(item)">
            <img src="../../assets/icon/delete.png" alt="" />
          </div>
          <div class="itemPic">
            <img :src="require(`../../assets/img/products/${item.id}.webp`)" alt="" />
          </div>
          <div class="descriptionBox">
            <div class="item__description" @click="goToItemPage(item)">{{ item.description }}</div>
            <div class="color">顏色：{{ item.color }}</div>
            <div class="size">尺寸：{{ item.size }}</div>
          </div>
          <div class="singleprice">NT ${{ item.price }}</div>
          <div class="select">
            <div
              class="minus"
              @click="minusOneQuantity(item.id, item.color, item.size, 1)"
              @touchend="minusOneQuantity(item.id, item.color, item.size, 1)"
            >
              -
            </div>
            <span class="quantity"> {{ item.quantity }}</span>
            <div
              class="plus"
              @click="plusOneQuantity(item.id, item.color, item.size, 1)"
              @touchend="plusOneQuantity(item.id, item.color, item.size, 1)"
            >
              +
            </div>
          </div>
          <div class="itemTotal">NT ${{ item.price * item.quantity }}</div>
        </li>
      </ul>
      <div v-if="!isCartEmpty" class="totalBox">
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
  data() {
    return {};
  },
  computed: {
    isCartEmpty() {
      console.log(this.$store.getters["membersData/queryMyBuyCart"].length);
      return this.$store.getters["membersData/queryMyBuyCart"].length === 0 ? true : false;
    },
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
    gotoHomePage() {
      this.$store.dispatch("changeFilterName", "All");
      this.$router.push("/");
    },
    goToItemPage(item) {
      this.$router.push(`/item/${item.id}`);
    },
    plusOneQuantity(id, color, size, quantity) {
      this.$store.dispatch("membersData/JustPlusOneQuantity", {
        id: id,
        color: color,
        size: size,
        quantity: quantity,
      });
    },
    minusOneQuantity(id, color, size, quantity) {
      this.$store.dispatch("membersData/JustMinusOneQuantity", {
        id: id,
        color: color,
        size: size,
        quantity: quantity,
      });
    },

    deleteBtn(item) {
      this.$store.dispatch("setShowMessage", true);
      this.$store.dispatch("membersData/deleteItemFromBuyCart", item);
    },
  },
  mounted() {
    this.$store.dispatch("changeFilterName", "buy");
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base/mixins";
.Blurbackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.331);
  z-index: 200;
}
.DeleteCheckBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
  width: 35rem;
  height: 15rem;
  background-color: rgb(241, 241, 241);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border-radius: 12px;
  border: 1px solid grey;
}

.delete {
  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.25rem;
    font-size: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 12px;
    transition: all 0.25s;
    &:hover {
      background-color: rgb(12, 118, 189);
      color: white;
    }
  }
  &__title {
    font-size: 2.5rem;
    color: rgb(202, 2, 2);
  }
  &__text {
    font-size: 1.75rem;
    font-weight: 200;
  }
  &__checkBox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-weight: 200;
  }
  &__comfirm {
    margin: 0 2rem;
    font-size: 1.5rem;
    padding: 0 1rem;
    border: 1px solid grey;
    &:hover {
      cursor: pointer;
      background-color: rgb(12, 118, 189);
      color: white;
    }
  }
  &__cancel {
    margin: 0 2rem;
    font-size: 1.5rem;
    padding: 0 1rem;
    border: 1px solid grey;
    &:hover {
      cursor: pointer;
      background-color: rgb(12, 118, 189);
      color: white;
    }
  }
}

.container {
  margin: 3rem auto;
  width: 70%;
  min-height: 45rem;
  display: flex;
  justify-content: center;
  align-items: top;

  @include SmallViewPort {
    width: 90%;
  }
  @include iPad {
    width: 80%;
  }
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
  grid-template-columns: 0.5fr 6fr 2fr 1.5fr 2fr;
  justify-items: center;
  background-color: gray;
  font-size: 3rem;
  @include SmallViewPort {
    display: none;
  }
  @include iPad {
    display: grid;
  }
}

.detail {
  width: 100%;
  //   background-color: yellowgreen;
}

.empty {
  width: 100%;
  height: 40rem;
  background-color: rgb(242, 240, 240);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10rem 0;

  & > img {
    width: 4rem;
    opacity: 0.35;
  }
}

.text {
  font-size: 2.5rem;
  color: rgb(174, 174, 174);
  font-weight: 200;
}

.goshopping {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 4rem;
  font-size: 2rem;
  background-color: rgb(143, 143, 143);
  cursor: pointer;
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

  @include SmallViewPort {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  }
  @include iPad {
    display: grid;
    height: 15rem;
    grid-template-columns: 0.5fr 1.25fr 4.75fr 2fr 1.5fr 2fr;
    justify-items: center;
    align-items: center;
  }
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

  @include SmallViewPort {
    padding: 0;
  }
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.singleprice {
  @include SmallViewPort {
    width: 11rem;
  }
  @include iPad {
    display: flex;
    width: max-content;
    justify-items: center;
    align-items: center;
  }
}

.select {
  width: 10rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.quantity {
  margin: 0 1rem;
  font-size: 1.5rem;
  @include SmallViewPort {
    margin: 1rem 1rem;
  }
}

.plus,
.minus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid grey;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(3px);
  }
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
