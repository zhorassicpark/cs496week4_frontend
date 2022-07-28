<template>
  <div>
    <h1 class="page-header">로그인 페이지</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  created() {
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserName", localStorage.getItem("userName"));
  },
};
</script>

<style></style>
