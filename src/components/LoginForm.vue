<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="userEmail">id:</label>
          <input id="userEmail" type="text" v-model="userEmail" />
          <p class="validation-text">
            <span class="warning" v-if="!isUserEmailValid || !userEmail">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isUserEmailValid || !userEmail || !password"
          type="submit"
          class="btn"
          :class="{ disabled: !isUserEmailValid || !userEmail || !password }"
        >
          LOG IN
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { validateEmail } from "@/utils/validation";
import { loginUser } from "@/api/auth";

export default {
  data() {
    return {
      // form values
      userEmail: "",
      password: "",
      // log
      logMessage: "",
    };
  },
  computed: {
    isUserEmailValid() {
      return validateEmail(this.userEmail);
    },
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    async submitForm() {
      try {
        console.log("LOGIN!!!");
        // 비즈니스 로직
        const userData = {
          userEmail: this.userEmail,
          password: this.password,
        };
        const { data } = await loginUser(userData);
        console.log("data");
        console.log(data);
        this.$store.commit("setUserEmail", data.data.userEmail);
        this.$store.commit("setUserName", data.data.userName);
        localStorage.setItem("userEmail", data.data.userEmail);
        localStorage.setItem("userName", data.data.userName);
        this.$router.push("/qanda");
        // console.log("userData");
        // console.log(userData);
        // const userInfo = this.$store.commit("getUserInfo", userData.userEmail);
        // console.log(userInfo);
        // console.log("before checking isLogin...");
        // console.log(this.isUserLogin);
        // if (this.isUserLogin) {
        //   console.log("일단 getter는 했다.");
        //   this.$router.push("/qanda");
        //   console.log("야호1");
        // } else {
        //   this.log = "LOG IN FAILURE";
        // }
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error);
        console.log(error.response.data);
        this.logMessage = error.response.data;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      console.log("initForm start...");
      this.userEmail = "";
      this.password = "";
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
