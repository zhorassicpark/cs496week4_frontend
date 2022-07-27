<template>
  <div class="container">
    <div class="form-container">
      <!-- <QuestionEditForm></QuestionEditForm> -->
      <!-- This is Question Detail Page -->
      <QuestionForm></QuestionForm>
    </div>
  </div>
</template>

<script>
// import QuestionEditForm from "@/components/questions/QuestionEditForm.vue";
import QuestionForm from "@/components/questions/QuestionForm.vue";

export default {
  components: {
    // QuestionEditForm,
    QuestionForm,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form-container {
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
