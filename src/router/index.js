import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/SignupPage.vue"),
  },
  {
    path: "/qanda",
    component: () => import("@/views/QnaPage.vue"),
  },
  // {
  //   path: "/main",
  //   component: () => import("@/views/MainPage.vue"),
  //   meta: { auth: true },
  // },
  // {
  //   path: "/add",
  //   component: () => import("@/views/PostAddPage.vue"),
  //   meta: { auth: true },
  // },
  // {
  //   path: "/post/:id",
  //   component: () => import("@/views/PostEditPage.vue"),
  //   meta: { auth: true },
  // },
  {
    path: "*",
    component: () => import("@/views/NotFoundPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
