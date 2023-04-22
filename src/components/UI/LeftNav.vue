<template>
  <div v-show="ShowLeftNav" class="navBox">
    <ul>
      <li
        v-for="item in categoryName"
        :key="item.dataName"
        :data-name="item.dataName"
        @click="gotoTheCategory(item.dataName)"
      >
        {{ item.showName }}
      </li>
    </ul>
    <div @click="closeLeftNav" @touchend="closeLeftNav" class="close">Close</div>
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
  computed: {
    ShowLeftNav() {
      return this.$store.getters.getLeftNavBoolean;
    },
  },
  methods: {
    gotoTheCategory(categoryName) {
      this.$store.dispatch("changeFilterName", categoryName);
      this.$router.push("/");
      this.$store.dispatch("toggleLeftNav", false);
    },
    closeLeftNav() {
      // console.log("close");
      this.$store.dispatch("toggleLeftNav", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base/variables";

.navBox {
  height: 100%;
  width: 250px;
  background-color: white;
  z-index: 200;
  position: fixed;
  //   position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style: none;
  width: 100%;
  height: 60%;
}

li {
  border-bottom: 1px solid grey;
  padding: 2rem 2rem;
  font-size: 1.75rem;
  height: 6rem;
  cursor: pointer;
  font-weight: 200;
  &:hover {
    background-color: $background-color-dark-grey;
    color: white;
    text-decoration: underline;
  }
  &:last-child {
    border-bottom: none;
  }
}

.close {
  position: absolute;
  width: 2.5rem;
  height: 5rem;
  top: 20%;
  font-size: 1.75rem;
  right: -2.5rem;
  border-radius: 0 6px 6px 0;
  text-align: center;
  background-color: white;
  cursor: pointer;
  writing-mode: vertical-lr;
}

// .leftnav-enter-from,
// .leftnav-leave-to {
//   transform: translateX(-100px);
// }
// .leftnav-enter-to,
// .leftnav-leave-from {
//   transform: translateX(0);
// }

// .leftnav-enter-active,
// .leftnav-leave-active {
//   transition: all 0.75s;
// }
</style>
