<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="userEmail">id: </label>
          <input id="userEmail" type="text" v-model="userEmail" />
          <p class="validation-text">
            <span class="warning" v-if="!isUserEmailValid || !userEmail">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw: </label>
          <input id="password" type="text" v-model="password" />
          <p class="validation-text">
            <span class="warning" v-if="!password">
              Please enter password
            </span>
          </p>
        </div>
        <div>
          <label for="userName">userName: </label>
          <input id="userName" type="text" v-model="userName" />
          <p class="validation-text">
            <span class="warning" v-if="!userName">
              Please enter userName
            </span>
          </p>
        </div>
        <button
          :disabled="!isUserEmailValid || !userEmail || !userName || !password"
          type="submit"
          class="btn"
          :class="{ disabled: !isUserEmailValid || !password }"
        >
          SIGN UP
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/api/auth";
import { validateEmail } from "@/utils/validation";

export default {
  data() {
    return {
      // form values
      userEmail: "",
      password: "",
      userName: "",
      // log
      logMessage: "",
    };
  },
  computed: {
    isUserEmailValid() {
      return validateEmail(this.userEmail);
    },
  },
  methods: {
    async submitForm() {
      const userData = {
        userEmail: this.userEmail,
        password: this.password,
        userName: this.userName,
      };
      try {
        const { data } = await registerUser(userData);
        console.log(data);
        this.logMessage = `${data.userEmail} 님이 가입되었습니다`;
        // this.$store.commit("addUser", userData);
        // console.log(this.userEmail);
        this.logMessage = `${this.userName} has signed up.`;
        this.initForm();
        this.$router.push("/login");
      } catch (error) {
        this.logMessage = error.response.data;
        this.initForm();
      }
    },
    initForm() {
      this.userEmail = "";
      this.password = "";
      this.userName = "";
    },
  },
};
</script>

<style></style>
