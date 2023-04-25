<template>
  <div class="ItemCard" @click="gotoItem(item)" @touch="gotoItem(item)">
    <div class="imgViewPort">
      <div v-if="item.haveDiscount" class="discountBar">優惠中</div>
      <img :src="require(`../../assets/img/products/${item.id}.webp`)" alt="" />
      <div class="heartBox">
        <img class="heart" v-if="!inTracking" src="../../assets/icon/emptyheart.png" alt="empty heart" />
        <img class="heart" v-else src="../../assets/icon/fullheart.png" alt="full heart" />
      </div>
    </div>
    <div class="text">{{ item.description }}</div>
    <div class="priceBox">
      <div class="price" :class="{ haveDiscount: item.haveDiscount }">NT ${{ item.price }}</div>
      <div v-if="item.haveDiscount" class="discountPrice">NT ${{ item.discountprice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      itemData: {},
    };
  },
  computed: {
    inTracking() {
      const item = this.item;
      return this.$store.getters["membersData/queryMyTracking"].includes(item.id);
    },
  },
  methods: {
    gotoItem(item) {
      // console.log(e.target);
      // if (e.target.getAttribute("class").includes("heart")) return;
      console.log(item);
      this.$store.dispatch("setNowClickItem", item);
      this.$router.push(`/item/${item.id}`);
    },
    AddItemToMytracking(id) {
      this.$store.dispatch("membersData/AddItemToMyTracking", id);
    },
    removeItemFromMytracking(id) {
      this.$store.dispatch("membersData/RemoveItemFromMyTracking", id);
    },
  },
  mounted() {
    this.itemData = this.item;
    // console.log(this.itemData);
    // this.$store.dispatch("changeFilterName", "");
  },
  unmounted() {
    // this.$store.dispatch("changeFilterName", "/");
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base/mixins";
.ItemCard {
  width: 100%;
  max-height: 48rem;
  //   background-color: bisque;
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgb(242, 240, 240);
    transform: translateY(-5px);
  }
  &:active {
    background-color: rgb(242, 240, 240);
    transform: translateY(0px);
  }
}

.imgViewPort {
  margin: 1.5rem auto 0rem auto;
  width: 90%;
  position: relative;
}
.imgViewPort > img {
  max-width: 100%;
  //   max-height: 100%;
}

.discountBar {
  position: absolute;
  background-color: red;
  color: white;
  top: 0.5rem;
  left: 0.5rem;
}

.heart {
  width: 2.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.text {
  width: 90%;
  margin: 0.25rem auto;
  //   background-color: blue;
  font-size: 1.5rem;
}

.priceBox {
  margin: 0.25rem auto;
  width: 90%;
  display: flex;
  flex-direction: row;
}

.price,
.discountPrice {
  font-size: 1.5rem;
  margin-right: 2rem;
  font-weight: 200;
}

.haveDiscount {
  text-decoration: line-through;
  color: gainsboro;
}
</style>
