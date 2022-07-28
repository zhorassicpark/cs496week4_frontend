<template>
  <div class="form-container">
    <QuestionEditForm></QuestionEditForm>
  </div>
</template>

<script>
import QuestionEditForm from "@/components/questions/QuestionEditForm.vue";

export default {
  components: {
    QuestionEditForm,
  },
  created() {
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserName", localStorage.getItem("userName"));
  },
};
</script>

<style></style>
