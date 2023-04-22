<template>
  <div class="UpperBox">
    <div class="map">首頁 > {{ getItemData.category }} > {{ getItemData.id }}</div>
  </div>
  <div class="container">
    <div class="leftBox">
      <div class="mainImgViewPort">
        <img :src="require(`../../assets/img/products/${getItemData.id}.webp`)" alt="" />
      </div>
      <div class="imgListBox">
        <template v-for="(imgSrc, index) in getItemDataPicListArray" :key="index">
          <img :src="require(`../../assets/img/products/${imgSrc}.webp`)" alt="" />
        </template>
      </div>
    </div>
    <div class="rightBox">
      <div>商品編號：{{ getItemData.id }}</div>
      <div class="ItemTitle">{{ getItemData.description }}</div>
      <div class="Info">
        <div class="price" :class="{ haveDiscount: getItemData.haveDiscount }">
          NT ${{ getItemData.price }}
        </div>
        <div v-if="getItemData.haveDiscount" class="discountPrice">NT ${{ getItemData.discountprice }}</div>
        <img
          v-if="!inTracking"
          @click="AddItemToMytracking(getItemData.id)"
          class="heart"
          src="../../assets/icon/emptyheart.png"
          alt=""
        />
        <img
          v-else
          @click="removeItemFromMytracking(getItemData.id)"
          class="heart"
          src="../../assets/icon/fullheart.png"
          alt=""
        />
      </div>
      <div class="colorBox">
        <div class="color__title">顏色</div>
        <template v-for="color in getItemData.color" :key="color">
          <input type="radio" name="color" :value="color" :id="color" v-model="itemGoBuy.PickColor" />
          <label class="color__choose" :for="color">{{ color }}</label>
        </template>
      </div>
      <div class="sizeBox">
        <div class="size__title">尺寸</div>
        <template v-for="size in getItemData.size" :key="size">
          <input
            class="radio"
            type="radio"
            name="size"
            :value="size"
            :id="size"
            v-model="itemGoBuy.PickSize"
          /><label class="size__choose" :for="size">{{ size }}</label>
        </template>
      </div>
      <div class="quantityBox">
        <div class="quantity__title">數量</div>
        <div class="quantity__choose">
          <select name="quantity" id="quantity" v-model="itemGoBuy.PickQuantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div class="joinbuycart" @click="addToBuyCart">
        加入購物車<img src="../../assets/icon/shopping-cart.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemGoBuy: {
        PickId: "",
        PickName: "",
        PickPrice: 0,
        PickColor: "",
        PickSize: "",
        PickQuantity: 1,
      },
    };
  },
  computed: {
    getfilterName() {
      return this.$store.getters.getNowFilterName;
    },
    inTracking() {
      const item = this.$store.getters.getNowClickItem;
      const QueryListArray = this.$store.getters["membersData/queryMyTracking"];
      return QueryListArray.includes(item.id);
    },
    getItemData() {
      console.log(this.$store.getters.getNowClickItem);
      return this.$store.getters.getNowClickItem;
    },
    getItemDataPicListArray() {
      const item = this.$store.getters.getNowClickItem;
      return item.src;
    },
  },
  methods: {
    init() {},
    validation() {
      if (!this.itemGoBuy.PickColor || !this.itemGoBuy.PickSize) {
        console.log("請選擇 顏色 與 尺寸");
        return false;
      }
      return true;
    },
    addToBuyCart() {
      if (!this.validation) return;
      const item = this.$store.getters.getNowClickItem;
      this.itemGoBuy.PickId = item.id;
      this.itemGoBuy.PickName = item.description;
      if (!item.haveDiscount) {
        this.itemGoBuy.PickPrice = item.price;
      } else {
        this.itemGoBuy.PickPrice = item.discountprice;
      }

      const newObj = {
        id: this.itemGoBuy.PickId,
        description: this.itemGoBuy.PickName,
        price: +this.itemGoBuy.PickPrice,
        color: this.itemGoBuy.PickColor,
        size: this.itemGoBuy.PickSize,
        quantity: +this.itemGoBuy.PickQuantity,
      };
      console.log(newObj);
      this.$store.dispatch("membersData/AddItemToMyBuyCart", newObj);
    },
    AddItemToMytracking(id) {
      this.$store.dispatch("membersData/AddItemToMyTracking", id);
    },
    removeItemFromMytracking(id) {
      this.$store.dispatch("membersData/RemoveItemFromMyTracking", id);
    },
  },
  mounted() {
    // console.log(this.itemData);
    // this.itemData = this.$store.getters.getNowClickItem
    // console.log(this.itemData);
    // console.log(this.$store.getters.getNowClickItem);
  },
};
</script>

<style lang="scss" scoped>
.UpperBox {
  width: 70%;
  margin: 2rem auto;
  min-height: 5rem;
  display: flex;
  justify-content: space-between;
  // background-color: grey;
  align-items: center;
  font-size: 2.5rem;
  padding: 0 5rem;
  //   color: grey;
  font-weight: 300;
}
.mapAndfilter {
  width: 70%;
  font-weight: 300;
}

.container {
  width: 70%;
  margin: 3rem auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
}

.left {
  width: 40%;
  //   padding: 2rem;
  background-color: green;
}
.mainImgViewPort {
  //   width: 85%;
  max-height: 500px;
  & > img {
    // width: 100%;
    padding: 0 1rem;
    max-height: 50rem;
    cursor: zoom-in;
  }
}

.imgListBox {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  & > img {
    max-height: 120px;
    padding: 1rem;
    cursor: pointer;
  }
}

.rightBox {
  padding: 2rem 3rem;
  margin-left: 10%;
  width: 50%;
  //   background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: 200;
}
.ItemTitle {
  width: 100%;
  margin: 2rem 0;
  max-height: 20rem;
  background-color: rgb(233, 233, 233);
  font-size: 3rem;
  font-weight: 100;
}

.Info {
  display: flex;
  width: 100%;
  font-size: 2.75rem;
  flex-direction: row;
  justify-content: start;
  //   align-items: center;

  & > img {
    margin: 0 2rem 0 auto;
    width: 2.25rem;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(2px);
    }
  }
}

.price {
  color: rgb(180, 11, 11);
  font-weight: 600;
}

.haveDiscount {
  color: rgb(133, 133, 133);
  text-decoration: line-through;
  font-weight: 300;
}
.discountPrice {
  color: rgb(180, 11, 11);
  font-weight: 600;
  margin-left: 3rem;
}

.colorBox,
.sizeBox,
.quantityBox {
  width: 100%;
  height: 8rem;
  font-size: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.color__title,
.size__title,
.quantity__title {
  width: 10rem;
}

.color__choose,
.size__choose {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border: 1px solid grey;
  margin-right: 1.5rem;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
    background-color: rgb(233, 233, 233);
  }
}

input[type="radio"] {
  opacity: 0;
  position: absolute;
}
input[type="radio"]:checked + label {
  color: white;
  background-color: rgb(84, 84, 84);
}

select {
  font-size: 1.5rem;
  width: 20rem;
  height: 3rem;
}

.joinbuycart {
  margin: 2rem auto;
  width: 100%;
  height: 4rem;
  font-size: 2rem;
  color: white;
  background-color: rgb(82, 82, 82);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  transition: all 0.25s ease-in-out;
  & > img {
    margin-left: 5rem;
    width: 2.5rem;
    filter: invert(1);
  }
  &:hover {
    cursor: pointer;
    background-color: rgb(111, 111, 111);
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
}
</style>
