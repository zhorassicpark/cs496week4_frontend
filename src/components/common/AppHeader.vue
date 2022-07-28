<template>
  <header>
    <div>
      <router-link :to="logoLink" class="logo">
        QUEUE OVERFLOW
        <span v-if="isUserLogin">by 악 ! 깡 ! 버 !</span>
      </router-link>
    </div>
    <div class="navigations">
      <!-- 1 -->
      <template v-if="isUserLogin">
        <a href="javascript:;" @click="logoutUser" class="logout-button">
          <h2 class="inline">LOG OUT</h2>
        </a>
        &nbsp;&nbsp;&nbsp;|&nbsp;
        <router-link to="/QandA"><h3 class="inline">Q & A</h3></router-link>
      </template>
      <!-- 2 -->
      <template v-else>
        <router-link to="/login"> <h3 class="inline">LOG IN</h3> </router-link>
        &nbsp;&nbsp;|
        <router-link to="/signup">
          <h3 class="inline">SIGN UP</h3>
        </router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { logoutUserAPI } from "@/api/auth";
// import { deleteCookie } from "@/utils/cookies";

export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    logoLink() {
      return this.$store.getters.isLogin ? "/main" : "/login";
    },
  },
  methods: {
    async logoutUser() {
      try {
        console.log("LOGOUT STARTS");
        await logoutUserAPI(this.$store.getters.getUserEmail);
        console.log("일단 비동기는 끝인디...");
        this.$store.commit("clearUserEmail");
        this.$store.commit("clearPassword");
        this.$store.commit("clearUserName");
        localStorage.setItem("userEmail", "");
        localStorage.setItem("userName", "");
        // this.$store.commit("clearUsername");
        // this.$store.commit("clearToken");
        // deleteCookie("til_auth");
        // deleteCookie("til_user");
        this.$router.push("/login");
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.inline {
  display: inline;
}
.username {
  color: white;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #927dfc;
  z-index: 2;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
}
a {
  color: #dedede;
  font-size: 18px;
}
a.logo {
  font-size: 30px;
  font-weight: 900;
  color: white;
}
.logo > span {
  font-size: 14px;
  font-weight: normal;
}
.navigations a {
  margin-left: 10px;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
}
.logout-button {
  font-size: 14px;
}
a.router-link-exact-active {
  color: white;
  font-weight: bold;
}
</style>
