<template>
  <div class="form-container">
    <AnswerAddForm></AnswerAddForm>
  </div>
</template>

<script>
import AnswerAddForm from "@/components/answers/AnswerAddForm.vue";

export default {
  components: {
    AnswerAddForm,
  },
  created() {
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserName", localStorage.getItem("userName"));
  },
};
</script>

<style></style>
