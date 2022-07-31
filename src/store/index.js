// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

import Vue from "vue";
import Vuex from "vuex";
// import {
//   getAuthFromCookie,
//   getUserFromCookie,
//   saveAuthToCookie,
//   saveUserToCookie,
// } from '@/utils/cookies';
import { loginUser } from "@/api/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userEmail: "",
    password: "",
    userName: "",
    ideurl: "http://172.30.1.16:7999/",
    dockerurl: "http://172.30.1.16:80/",
    // userList: [
    //   {
    //     userEmail: "a@naver.com",
    //     password: "hihi",
    //     userName: "abe",
    //   },
    // ],
  },
  getters: {
    isLogin(state) {
      return state.userEmail !== "" && state.userEmail !== null;
    },
    getUserEmail(state) {
      return state.userEmail;
    },
    getUserName(state) {
      return state.userName;
    },
  },
  mutations: {
    // addUser(state, userInfo) {
    //   state.userList.push(userInfo);
    // },
    // getUserInfo(state, userEmail) {
    //   console.log("userEmail: ");
    //   console.log(userEmail);
    //   const ans = state.userList.find((e) => {
    //     console.log("비교");
    //     console.log(e);
    //     console.log(e.userEmail);
    //     console.log(typeof e.userEmail);
    //     console.log(userEmail);
    //     console.log(typeof userEmail);
    //     console.log(userEmail === e.userEmail);
    //     return e.userEmail === userEmail;
    //   });
    //   console.log(ans);
    //   if (ans) {
    //     state.userEmail = ans.userEmail;
    //     state.password = ans.password;
    //     state.userName = ans.userName;
    //   }
    // },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
    clearUserEmail(state) {
      state.userEmail = "";
    },
    setPassword(state, password) {
      state.password = password;
    },
    clearPassword(state) {
      state.password = "";
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    clearUserName(state) {
      state.userName = "";
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      // console.log(data.token);
      // commit("setToken", data.token);
      commit("setuserEmail", data.user.userEmail);
      // saveAuthToCookie(data.token);
      // saveUserToCookie(data.user.userEmail);
      return data;
    },
  },
});
