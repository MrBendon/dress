<template>
  <div class="categoryBox">
    <ul class="categoryList">
      <li
        class="item"
        v-for="categoryItem in categoryName"
        :key="categoryItem"
        :dataName="categoryItem.dataName"
        @click="gotoTheCategory(categoryItem.dataName)"
      >
        {{ categoryItem.showName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryName: [
        { showName: "全部商品 / All", dataName: "All" },
        { showName: "活動優惠 / For Sale", dataName: "For Sale" },
        { showName: "上衣 / Top", dataName: "Top" },
        { showName: "下身 / Bottom", dataName: "Bottom" },
        { showName: "外套 / Outer", dataName: "Outer" },
        { showName: "套裝 / Suit", dataName: "Suit" },
        { showName: "鞋類 / Shoes", dataName: "Shoes" },
        { showName: "配件 / Accessories", dataName: "Accessories" },
      ],
    };
  },
  methods: {
    gotoTheCategory(categoryName) {
      this.$store.dispatch("changeFilterName", categoryName);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base/variables";
@import "../../assets/css/base/mixins";
.categoryBox {
  position: sticky;
  top: 8vh;
  width: 100%;
  background-color: rgb(239, 239, 239);
  z-index: 100;

  @include SmallViewPort {
    display: none;
  }

  @include iPad {
    display: block;
  }
}
.categoryList {
  list-style: none;
  margin: 0 auto;
  width: 70%;
  // background-color: yellowgreen;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
  font-size: 3rem;
  font-weight: 300;
  @include iPad {
    font-size: 1.75rem;
  }
  @include ViewPort-1024 {
    font-size: 2.5rem;
  }
  @include ViewPort-1280 {
    font-size: 3rem;
  }
}

.item {
  cursor: pointer;
  height: 3.5rem;
  padding: 0.3rem 0;
  text-align: center;
  @include iPad {
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @include ViewPort-1024 {
    height: 3.5rem;
  }
  &:hover {
    color: white;
    background-color: $background-color-dark-grey;
  }
}
</style>
