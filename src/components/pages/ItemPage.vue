<template>
  <div class="UpperBox">
    <div class="map">首頁 > {{ getItemData.category }} > {{ getItemData.id }}</div>
  </div>
  <add-message>
    <template #title> 已完成加入 </template>
    <template #message> 已加入購物車，可前往購物車查看 </template>
  </add-message>
  <div class="container">
    <div class="leftBox">
      <div class="mainImgViewPort">
        <template v-for="(imgSrc, index) in getItemDataPicListArray" :key="index">
          <!-- <img :src="require(`../../assets/img/products/${getItemData.id}.webp`)" alt="" /> -->
          <img
            v-show="index + 1 === showImg"
            :src="require(`../../assets/img/products/${imgSrc}.webp`)"
            alt=""
          />
        </template>
        <div v-if="ImgMoreTheOne" class="rightBtn Btn" @click="goRight">→</div>
        <div v-if="ImgMoreTheOne" class="leftBtn Btn" @click="goLeft">←</div>
      </div>
      <div class="imgListBox">
        <template v-for="(imgSrc, index) in getItemDataPicListArray" :key="index">
          <img
            :src="require(`../../assets/img/products/${imgSrc}.webp`)"
            alt=""
            @click="goTheImg(index + 1)"
          />
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
      <div v-if="!PassValidation && !itemGoBuy.PickColor" class="colorValidationBox">請點選您想要的顏色</div>
      <div v-else class="colorValidationBox"></div>
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
      <div v-if="!PassValidation && !itemGoBuy.PickSize" class="sizeValidationBox">請點選您想要的尺寸</div>
      <div v-else class="sizeValidationBox"></div>
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
      isGoRight: false,
      moveTo: 1,
      PassValidation: true,
    };
  },
  computed: {
    ImgMoreTheOne() {
      return this.$store.getters.getNowClickItem.src.length > 1 ? true : false;
    },
    showImg() {
      return this.moveTo;
    },
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
    showMessageBox() {
      this.$store.dispatch("setShowMessage", true);
    },

    ValidationCheck() {
      if (!this.itemGoBuy.PickColor || !this.itemGoBuy.PickSize) {
        console.log(this.itemGoBuy.PickColor);
        console.log(this.itemGoBuy.PickSize);
        console.log("請選擇 顏色 與 尺寸");
        this.PassValidation = false;
        return false;
      } else {
        this.PassValidation = true;
        return true;
      }
    },
    addToBuyCart() {
      this.ValidationCheck();
      if (!this.PassValidation) return;

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
      this.$store.dispatch("setShowMessage", true);
      this.$store.dispatch("membersData/AddItemToMyBuyCart", newObj);
    },
    AddItemToMytracking(id) {
      this.$store.dispatch("membersData/AddItemToMyTracking", id);
    },
    removeItemFromMytracking(id) {
      this.$store.dispatch("membersData/RemoveItemFromMyTracking", id);
    },
    goRight() {
      const item = this.$store.getters.getNowClickItem;
      const ImgQuantity = item.src.length;
      if (this.moveTo < ImgQuantity) {
        this.moveTo++;
        this.isGoRight = true;
      } else {
        this.moveTo = 1;
        this.isGoRight = false;
      }
    },
    goLeft() {
      const item = this.$store.getters.getNowClickItem;
      const ImgQuantity = item.src.length;
      if (this.moveTo === 1) {
        this.moveTo = ImgQuantity;
        this.isGoRight = true;
      } else {
        this.moveTo--;
        this.isGoRight = false;
      }
    },
    goTheImg(Num) {
      if (Num > this.moveTo) {
        this.isGoRight = true;
      } else {
        this.isGoRight = false;
      }
      this.moveTo = Num;
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
@import "../../assets/css/base/mixins";
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

  @include SmallViewPort {
    flex-direction: column;
    width: 85%;
  }
  @include iPad {
    flex-direction: row;
    width: 85%;
  }
  @include ViewPort-1024 {
    width: 75%;
  }
  @include ViewPort-1440 {
    width: 70%;
  }
}

.leftBox {
  width: 35%;
  @include SmallViewPort {
    width: 100%;
  }
  @include iPad {
    width: 55%;
  }
  @include ViewPort-1440 {
    width: 50%;
  }
}
.mainImgViewPort {
  //   width: 85%;
  max-width: 360px;
  max-height: 550px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  @include SmallViewPort {
    margin: 0 auto;
  }
  @include ViewPort-1440 {
    max-width: 400px;
  }

  & > img {
    // width: 100%;
    // padding: 0 1rem;
    max-height: 55rem;
    // cursor: zoom-in;
    filter: blur(10px);
    @include SmallViewPort {
      max-width: 360px;
    }
    @include iPad {
      max-width: 370px;
      max-height: 55rem;
    }
    @include ViewPort-1440 {
      max-width: 400px;
    }
  }
}

.Btn {
  position: absolute;
  width: 4rem;
  height: 4rem;
  background-color: rgba(128, 128, 128, 0.2);
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.15s;
  @include SmallViewPort {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2.5rem;
  }
  @include iPad {
    width: 4rem;
    height: 4rem;
    font-size: 3rem;
  }

  cursor: pointer;
  &:hover {
    color: white;
    background-color: rgba(128, 128, 128, 0.8);
  }
}

.rightBtn {
  right: 1rem;
}
.leftBtn {
  left: 1rem;
}

.imgListBox {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @include SmallViewPort {
    display: grid;
    max-width: 360px;
    margin: 0 auto;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
  }
  @include ViewPort-1440 {
    max-width: 400px;
    grid-template-columns: repeat(4, 1fr);
  }

  & > img {
    max-height: 120px;
    padding: 1rem;
    cursor: pointer;
    filter: blur(3px);
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
  @include SmallViewPort {
    padding: 2rem 0.5rem;
    margin-left: 0%;
    width: 100%;
  }
  @include iPad {
    width: 40%;
  }
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

.colorValidationBox,
.sizeValidationBox {
  color: rgb(163, 15, 15);
  font-size: 1.25rem;
  font-weight: 400;
  padding-left: 10rem;
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
