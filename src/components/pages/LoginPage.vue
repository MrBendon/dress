<template>
  <div class="LoginContainer">
    <div class="Box">
      <div class="title">會員登入</div>
      <label for="account">帳號</label>
      <input type="text" id="account" placeholder="請輸入會員帳號" v-model="inputId" />

      <div v-show="!passValidation && AccountErroerMessage" class="errortext">{{ AccountErroerMessage }}</div>
      <div v-show="passValidation || (this.inputId && !AccountErroerMessage)" class="errortext"></div>

      <label for="password">密碼</label>
      <input type="password" id="password" placeholder="請輸入密碼" v-model="inputPw" />

      <div
        v-show="
          (!passValidation && !this.inputPw) ||
          (!passValidation && this.inputPw.length < 6) ||
          PWErroerMessage !== ''
        "
        class="errortext"
      >
        請檢查密碼(密碼長度需大於6個字元){{ PWErroerMessage }}
      </div>
      <div v-show="passValidation || this.inputPw.length >= 6" class="errortext"></div>

      <div class="loginBtn" @click="login">登入</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputId: "",
      inputPw: "",
      passValidation: true,
      AccountErroerMessage: "",
      PWErroerMessage: "",
    };
  },
  computed: {},
  methods: {
    validation() {
      this.PWErroerMessage = "";
      if (this.inputId === "") {
        this.AccountErroerMessage = "請輸入會員帳號";
      }
      if (this.inputId === "" || this.inputPw === "" || this.inputPw.length < 6) {
        this.passValidation = false;
      } else {
        this.passValidation = true;
        this.AccountErroerMessage = "";
      }
    },
    login() {
      this.validation();
      if (!this.passValidation) return;
      // console.log(this.inputId, this.inputPw);
      // console.log(this.$store.getters["membersData/queryAllMembers"]);
      const haveID = this.$store.getters["membersData/queryAllMembers"].some(
        (el) => el.UserId === this.inputId
      );
      if (!haveID) {
        console.log(haveID);
        this.AccountErroerMessage = "該帳號尚未註冊";
        this.passValidation = false;
        return;
      } else {
        this.AccountErroerMessage = "";
        console.log("have ID ?", haveID);

        const haveCorrectPw =
          this.$store.getters["membersData/queryAllMembers"].find((el) => el.UserId === this.inputId).Pw ===
          this.inputPw;
        console.log("Correct PW ?", haveCorrectPw);
        if (!haveCorrectPw) {
          this.PWErroerMessage = "(密碼錯誤)";
        } else {
          console.log("correct!");
          // const TheMemberData = this.$store.getters["membersData/queryAllMembers"].find(
          //   (el) => el.UserId === this.inputId
          // );
          // console.log(TheMemberData);
          this.$store.dispatch("setLoginId", this.inputId);
          this.$store.dispatch("membersData/setNowActiveMembersData", this.inputId);
          this.$router.push("/");
        }
      }
    },
  },
  mounted() {
    this.$store.dispatch("changeWannaLogin", true);
  },
  unmounted() {
    this.$store.dispatch("changeWannaLogin", false);
  },
};
</script>

<style lang="scss" scoped>
.LoginContainer {
  width: 100%;
  height: 58rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Box {
  min-width: 35rem;
  //   max-width: 50rem;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  font-size: 3rem;
  border: 1px solid grey;
  border-radius: 12px;
  box-shadow: 10px 11px 9px 3px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 10px 11px 9px 3px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 10px 11px 9px 3px rgba(0, 0, 0, 0.35);
  & > label {
    margin: 2rem 0;
  }
  & > input {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    &::-webkit-input-placeholder {
      font-size: 1.5rem;
      opacity: 0.7;
    }
  }
}

.title {
  text-align: center;
  font-size: 2.5rem;
  margin: 1rem 0 2rem 0;
}

.errortext {
  color: rgb(201, 0, 0);
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0.5rem;
  height: 2.5rem;
}

.loginBtn {
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  margin: 3rem auto 2rem auto;
  background-color: rgba(128, 128, 128, 0.306);
  transition: all 0.25s;
  border-radius: 12px;
  &:hover {
    cursor: pointer;
    background-color: grey;
    color: white;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(2px);
  }
}
</style>
