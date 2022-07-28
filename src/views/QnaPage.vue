<template>
  <div class="about">
    <div class="main list-container contents">
      <h1 class="page-header">Q & A BOARD</h1>
      <form class="inputform" @submit.prevent="search">
        <input
          class="input"
          type="text"
          v-model="searchWord"
          placeholder="input search word..."
        /><button type="submit" class="btn">SEARCH</button>
      </form>
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
import { fetchQuestions, fetchQuestionWithSearchWord } from "@/api/questions";

export default {
  components: {
    QuestionListItem,
    LoadingSpinner,
  },
  data() {
    return {
      questionItems: [],
      isLoading: false,
      searchWord: "",
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
    async search() {
      if (this.searchWord === "") return;
      this.isLoading = true;
      console.log("searchWord");
      console.log(this.searchWord);
      const { data } = await fetchQuestionWithSearchWord(this.searchWord);
      this.isLoading = false;
      this.questionItems = data.data;
    },
  },
  created() {
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserName", localStorage.getItem("userName"));
    this.fetchData();
  },
};
</script>

<style scoped>
.input {
  border: solid;
  width: 90%;
}
.inputform {
  /* width: 100%; */
  /* align-items: center; */
}
.btn {
  color: white;
  height: 30px;
  font-size: 50%;
}
</style>
