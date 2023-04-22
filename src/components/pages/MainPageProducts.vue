<template>
  <div class="UpperBox">
    <div class="map">首頁 > {{ getfilterName }}</div>
  </div>
  <div class="container">
    <base-item-card v-for="item in ShowCategoryItem" :key="item.id" :item="item"></base-item-card>
  </div>
  <div class="pageBox">
    <span
      class="pageNum"
      v-for="num in createNumPage"
      :key="num"
      @click="gotoPage(num)"
      :class="{ activePageNum: nowPage === num }"
      >{{ num }}</span
    >
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      categoryArray: [],
      nowPage: 1,
      eachPageShowItemNum: 8,
    };
  },
  computed: {
    getAllProducts() {
      return this.$store.getters["Products/getProducts"];
    },
    getfilterName() {
      return this.$store.getters.getNowFilterName;
    },
    ShowCategoryItem() {
      const categoryName = this.$store.getters.getNowFilterName;
      let CategoryArray = [];
      let firstItemNum = this.eachPageShowItemNum * (this.nowPage - 1);
      let lastItemNum = this.eachPageShowItemNum * this.nowPage;

      if (categoryName === "All" || categoryName === "") {
        CategoryArray = this.$store.getters["Products/getProducts"];
        // getPages();
        return CategoryArray.slice(firstItemNum, lastItemNum);
      } else if (categoryName === "For Sale") {
        CategoryArray = this.$store.getters["Products/getProducts"].filter((el) => el.haveDiscount === true);
        return CategoryArray.slice(firstItemNum, lastItemNum);
      } else {
        CategoryArray = this.$store.getters["Products/getProducts"].filter(
          (el) => el.category === categoryName
        );
        return CategoryArray.slice(firstItemNum, lastItemNum);
      }
    },
    createNumPage() {
      const categoryName = this.$store.getters.getNowFilterName;
      let CategoryArray = [];
      if (categoryName === "All" || categoryName === "") {
        CategoryArray = this.$store.getters["Products/getProducts"];
        let array = [];
        let maxNum = Math.ceil(CategoryArray.length / this.eachPageShowItemNum);

        for (let i = 0; i < maxNum; i++) {
          array.push(i + 1);
        }
        return array;
      } else if (categoryName === "For Sale") {
        CategoryArray = this.$store.getters["Products/getProducts"].filter((el) => el.haveDiscount === true);
        let array = [];
        let maxNum = Math.ceil(CategoryArray.length / this.eachPageShowItemNum);
        for (let i = 0; i < maxNum; i++) {
          array.push(i + 1);
        }
        return array;
      } else {
        CategoryArray = this.$store.getters["Products/getProducts"].filter(
          (el) => el.category === categoryName
        );
        let array = [];
        let maxNum = Math.ceil(CategoryArray.length / this.eachPageShowItemNum);
        for (let i = 0; i < maxNum; i++) {
          array.push(i + 1);
        }
        return array;
      }
    },
  },
  methods: {
    gotoPage(PageNum) {
      this.nowPage = PageNum;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.UpperBox {
  width: 70%;
  margin: 1rem auto 1rem auto;
  min-height: 5rem;
  display: flex;
  justify-content: space-between;
  // background-color: grey;
  align-items: center;
  font-size: 2.5rem;
  // padding: 0 2rem;
  //   color: grey;
  font-weight: 300;
}

.fromHighest {
  margin-right: 3rem;
  cursor: pointer;
}
.fromLowest {
  cursor: pointer;
}
.container {
  margin: 0rem auto;
  width: 70%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  //   background-color: blue;
}

.pageBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 15%;
  margin: 3rem auto;
  //   cursor: pointer;
  //   background-color: rgb(214, 214, 214);
}

.pageNum {
  padding: 0rem 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: rgb(192, 191, 191);
  transition: all 0.25s ease-in-out;
  &:hover {
    // transform: translateY(-3px);
    color: black;
  }
  //   &:active {
  // transform: translateY(2px);
  //   }
}
.activePageNum {
  font-size: 2rem;
  color: rgb(73, 73, 73);
}
</style>
