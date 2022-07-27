<template>
  <div class="container">
    <div class="li-container">
      <!-- <QuestionEditForm></QuestionEditForm> -->
      <!-- This is Question Detail Page -->
      <div></div>
      <QuestionForm></QuestionForm>
      <!-- <div> -->
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else>
        <AnswerListItem
          v-for="answerItem in answerItems"
          :key="answerItem.id"
          :answerItem="answerItem"
          @refresh="fetchData"
        ></AnswerListItem>
      </ul>
      <!-- </div> -->
    </div>
    <button @click="moveToAnswerAdd" class="create-button">
      <i class="ion-md-add"></i>
    </button>
  </div>
</template>

<script>
// import QuestionEditForm from "@/components/questions/QuestionEditForm.vue";
import QuestionForm from "@/components/questions/QuestionForm.vue";
import AnswerListItem from "@/components/answers/AnswerListItem.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { fetchQuestionsAnswers } from "@/api/answers";

export default {
  components: {
    // QuestionEditForm,
    QuestionForm,
    AnswerListItem,
    LoadingSpinner,
  },
  data() {
    return {
      answerItems: [],
      isLoading: false,
    };
  },
  methods: {
    moveToAnswerAdd() {
      this.$router.push(`/question/${this.$route.params.id}/addanswer`);
    },
    async fetchData() {
      // this.isLoading = true;
      const { data } = await fetchQuestionsAnswers(this.$route.params.id);
      this.isLoading = false;
      this.answerItems = data.data;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.li-container {
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
