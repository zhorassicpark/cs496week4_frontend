<template>
  <div class="about">
    <div class="main list-container contents">
      <h1 class="page-header">Q & A BOARD</h1>
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else>
        <QuestionListItem
          v-for="questionItem in questionItems"
          :key="questionItem._id"
          :questionItem="questionItem"
          @refresh="fetchData"
        ></QuestionListItem>
      </ul>
    </div>
    <router-link to="/addQuestion" class="create-button">
      <i class="ion-md-add"></i>
    </router-link>
  </div>
</template>

<script>
import QuestionListItem from "@/components/questions/QuestionListItem";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { fetchQuestions } from "@/api/questions";

export default {
  components: {
    QuestionListItem,
    LoadingSpinner,
  },
  data() {
    return {
      questionItems: [],
      isLoading: false,
    };
  },
  methods: {
    // moveToQuestion(id) {
    //   console.log("clicked!");
    //   this.$router.push(`/question/${id}`);
    // },
    async fetchData() {
      this.isLoading = true;
      const { data } = await fetchQuestions();
      this.isLoading = false;
      this.questionItems = data.data;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
