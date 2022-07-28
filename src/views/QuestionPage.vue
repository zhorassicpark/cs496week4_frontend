<template>
  <div class="container">
    <div class="li-container">
      <!-- <QuestionEditForm></QuestionEditForm> -->
      <!-- This is Question Detail Page -->
      <!-- <div></div>
      <QCommentListItem></QCommentListItem>
      <i class="fa-solid fa-arrow-turn-down-right"></i> -->
      <QuestionForm
        @addQComment="addQCommentStart"
        class="question"
      ></QuestionForm>
      <ul class="commentlist">
        <QCommentListItem
          v-for="qCommentItem in qCommentItems"
          :key="qCommentItem.id"
          :qCommentItem="qCommentItem"
          @refresh="fetchData"
        ></QCommentListItem>
        <QCommentAddForm
          v-if="addQCommentBtnClicked"
          :questionItem="questionItem"
          @addQCommentFinished="addQCommentEnd"
          @refresh="fetchData"
        ></QCommentAddForm>
      </ul>
      =============================================================================================================
      <!-- <div> -->
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else class="answerlist">
        <span v-for="item in itemList" :key="item.answerItem.id" class="answer">
          <AnswerListItem
            :answerItem="item.answerItem"
            @addComment="addACommentStart"
          ></AnswerListItem>
          <ul class="acommentlist">
            <ACommentListItem
              v-for="aComment in item.aCommentList"
              :key="aComment.id"
              :aCommentItem="aComment"
              @refresh="fetchData"
            ></ACommentListItem>
            <ACommentAddForm
              v-if="item.addACommentBtnClicked"
              :answerItem="item.answerItem"
              @addCommentFinished="addACommentEnd"
              @refresh="fetchData"
            ></ACommentAddForm>
          </ul>
        </span>
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
import ACommentListItem from "@/components/comments/ACommentListItem.vue";
import ACommentAddForm from "@/components/comments/ACommentAddForm.vue";
import QCommentAddForm from "@/components/comments/QCommentAddForm.vue";
import QCommentListItem from "@/components/comments/QCommentListItem.vue";
import { fetchQuestionsAnswers } from "@/api/answers";
import { fetchAnswersAComments } from "@/api/acomments";
import { fetchQuestionsQComments } from "@/api/qcomments";
import { fetchQuestion } from "@/api/questions";

export default {
  components: {
    // QuestionEditForm,
    ACommentListItem,
    ACommentAddForm,
    QuestionForm,
    QCommentAddForm,
    QCommentListItem,
    AnswerListItem,
    LoadingSpinner,
  },
  data() {
    return {
      answerItems: [],
      qCommentItems: [],
      questionItem: {},
      isLoading: false,
      itemList: [],
      addQCommentBtnClicked: false,
    };
  },
  methods: {
    moveToAnswerAdd() {
      this.$router.push(`/question/${this.$route.params.id}/addanswer`);
    },
    async fetchData() {
      this.isLoading = true;
      const { data: data3 } = await fetchQuestion(this.$route.params.id);
      this.questionItem = data3.data;
      const { data } = await fetchQuestionsQComments(this.$route.params.id);
      this.qCommentItems = data.data;
      const { data: data2 } = await fetchQuestionsAnswers(
        this.$route.params.id
      );
      this.isLoading = false;
      this.answerItems = data2.data;
      this.itemList = [];
      for (let answerItem of this.answerItems) {
        const aCommentList = (await fetchAnswersAComments(answerItem.id)).data
          .data;
        console.log(answerItem);
        console.log(aCommentList);
        this.itemList.push({
          answerItem,
          aCommentList,
          addACommentBtnClicked: false,
        });
      }
    },
    addACommentStart(answerId) {
      const item = this.itemList.find((e) => {
        return e.answerItem.id === answerId;
      });
      item.addACommentBtnClicked = true;
    },
    addACommentEnd(answerId) {
      const item = this.itemList.find((e) => {
        return e.answerItem.id === answerId;
      });
      item.addACommentBtnClicked = false;
    },
    addQCommentStart() {
      this.addQCommentBtnClicked = true;
      console.log(this.addQCommentBtnClicked);
    },
    addQCommentEnd() {
      this.addQCommentBtnClicked = false;
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
/* .commentlist {
  display: flex;
  flex-direction: row-reverse;
} */
.answer {
  width: 100%;
}
.commentlist {
  width: 52%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.acommentlist {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.answerlist {
  width: 53%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.li-container {
  width: 100%;
  /* margin-right: auto;
  margin-left: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.question {
  width: 1000px;
}
.fullwidth {
  width: 100%;
  display: inline-block;
  /* align-items: center; */
}
</style>
