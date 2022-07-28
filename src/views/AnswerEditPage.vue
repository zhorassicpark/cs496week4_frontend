<template>
  <div class="form-container">
    <AnswerEditForm></AnswerEditForm>
  </div>
</template>

<script>
import AnswerEditForm from "@/components/answers/AnswerEditForm";

export default {
  components: {
    AnswerEditForm,
  },
  created() {
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserName", localStorage.getItem("userName"));
  },
};
</script>

<style></style>
