<template>
  <div class="Container">
    <div class="imageViewPort">
      <transition-group :name="SlideDirection">
        <img
          v-for="img in imgdata"
          v-show="img.Id === showImg"
          :key="img.Id"
          class="img"
          :src="require(`../../assets/img/SlideImg/${img.Id}.jpeg`)"
        />
      </transition-group>
      <div class="leftBtn Btn" @click="goLeft">←</div>
      <div class="dotBox">
        <template v-for="img in imgdata" :key="img.Id">
          <div class="dot" :class="{ Active: moveTo === img.Id }" @click="goTheSlide(img.Id)"></div>
        </template>
      </div>
      <div class="rightBtn Btn" @click="goRight">→</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGoRight: false,
      moveTo: 1,
      imgdata: [
        { Id: 1, src: "../../assets/img/SlideImg/1.jpeg" },
        { Id: 2, src: "../../assets/img/SlideImg/2.jpeg" },
        { Id: 3, src: "../../assets/img/SlideImg/3.jpeg" },
        { Id: 4, src: "../../assets/img/SlideImg/4.jpeg" },
      ],
    };
  },
  computed: {
    SlideDirection() {
      return this.isGoRight ? "right" : "left";
    },
    showImg() {
      // console.log(this.moveTo);
      return this.moveTo;
    },
  },
  methods: {
    slide() {
      setInterval(() => {
        this.goRight();
      }, 3000);
    },
    stopSlide() {
      //   console.log(this.timer());
      //   clearInterval(this.timer());
      //   console.log("clear");
    },
    goRight() {
      if (this.moveTo < 4) {
        this.moveTo++;
        this.isGoRight = true;
      } else {
        this.moveTo = 1;
        this.isGoRight = false;
      }
    },
    goLeft() {
      if (this.moveTo === 1) {
        this.moveTo = 4;
        this.isGoRight = true;
      } else {
        this.moveTo--;
        this.isGoRight = false;
      }
    },
    goTheSlide(Num) {
      if (Num > this.moveTo) {
        this.isGoRight = true;
      } else {
        this.isGoRight = false;
      }
      this.moveTo = Num;
    },
  },
  mounted() {
    this.slide();
  },
};
</script>

<style lang="scss" scoped>
.Container {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imageViewPort {
  position: relative;
  max-width: 1000px;
  display: flex;
  overflow: hidden;
  margin-bottom: 5vh;
}

.img {
  position: relative;
  max-width: 100%;
}

.dotBox {
  position: absolute;
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 1rem;
}

.dot {
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  margin: 0 1.5rem;
  transition: all 0.15s;
  cursor: pointer;
  &:hover {
    background-color: rgba(128, 128, 128, 0.8);
  }
}

.Btn {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 2.5rem;
  padding: 0 0.75rem;
  border-radius: 50%;
  background-color: rgba(128, 128, 128, 0.2);
  position: absolute;
  top: 50%;
  transition: all 0.15s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: rgba(128, 128, 128, 0.8);
  }
}

.leftBtn {
  left: 2rem;
}

.rightBtn {
  right: 2rem;
}

.Active {
  background-color: rgba(128, 128, 128, 0.8);
}

.right-enter-from {
  transform: translateX(100%);
}
.right-enter-to,
.right-leave-from {
  transform: translateX(0);
}

.right-leave-to {
  transform: translateX(-100%);
  position: absolute;
}

.right-enter-active,
.right-leave-active,
.left-enter-active,
.left-leave-active {
  transition: all 0.35s ease-in-out;
}

.left-enter-from {
  transform: translateX(-100%);
}
.left-enter-to,
.left-leave-from {
  transform: translateX(0%);
}

.left-leave-to {
  position: absolute;
  transform: translateX(100%);
}
</style>
