<template>
  <div class="contents">
    <h1 class="page-header">Submit An Answer!</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents:</label>
          <textarea id="contents" type="text" rows="5" v-model="content" />
          <p
            v-if="!isContentValid"
            class="validation-text warning isContentTooLong"
          >
            Content length must be less than 250
          </p>
        </div>
        <button type="submit" class="btn">Create</button>
        <div>
          Save Answer and Use IDE???
          <button type="button" @click="submitAnswerWithIDE" class="btn">
            YES
          </button>
        </div>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { createAnswer } from "@/api/answers";
import axios from "axios";
import { fetchQuestion } from "@/api/questions";

export default {
  data() {
    return {
      title: "",
      content: "",
      logMessage: "",
    };
  },
  computed: {
    isContentValid() {
      return this.content.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      try {
        console.log("BEFORE CREATE ANSWER");
        const response = await createAnswer({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
          questionId: this.$route.params.id,
        });
        this.$router.push(`/question/${this.$route.params.id}`);
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
    async submitAnswerWithIDE() {
      let response;
      try {
        response = await createAnswer({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
          questionId: this.$route.params.id,
        });
        this.$router.push(`/question/${this.$route.params.id}`);
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      const { data } = await fetchQuestion(response.data.data.questionId);
      const question = data.data;
      console.log("PIOST");
      console.log(question);
      console.log({
        imageId: question.imageId,
        tagId: null,
        language: question.language,
        questionId: question.id,
        answerId: response.data.data.id,
      });
      instance.post("compiler/compile", {
        imageId: question.imageId,
        tagId: null,
        language: question.language,
        questionId: question.id,
        answerId: response.data.data.id,
      });
      await setTimeout(() => {
        window.open(this.$store.state.ideurl);
        console.log("after");
      }, 3000);
      // this.submitForm();
    },
  },
};
</script>

<style scoped>
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
</style>
