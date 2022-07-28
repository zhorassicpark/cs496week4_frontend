<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <h1>Hello ! This is and Stack overflow Site.</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
  created() {
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserName", localStorage.getItem("userName"));
  },
})
export default class HomeView extends Vue {}
</script>
