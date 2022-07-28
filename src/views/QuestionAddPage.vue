<template>
  <div class="form-container">
    <QuestionAddForm></QuestionAddForm>
  </div>
</template>

<script>
import QuestionAddForm from "@/components/questions/QuestionAddForm.vue";

export default {
  components: {
    QuestionAddForm,
  },
  created() {
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserName", localStorage.getItem("userName"));
  },
};
</script>

<style></style>
