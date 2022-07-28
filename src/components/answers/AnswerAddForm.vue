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
          <button type="button" @click="submitWithPythonIDE" class="btn">
            Python
          </button>
          <button type="button" @click="submitWithJavaIDE" class="btn">
            Java
          </button>
          <button type="button" @click="submitWithNodeIDE" class="btn">
            Node
          </button>
          <button type="button" @click="submitWithCIDE" class="btn">C</button>
          <button type="button" @click="submitWithRubyIDE" class="btn">
            Ruby
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
    async submitWithPythonIDE() {
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
      const question = await fetchQuestion(response.data.data.questionId);
      instance.post("compiler/compile", {
        imageId: question.imageId,
        tagId: question.tagId,
        language: "python",
        questionId: question.id,
        answerId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithJavaIDE() {
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
      const question = await fetchQuestion(response.data.data.questionId);
      instance.post("compiler/compile", {
        imageId: question.imageId,
        tagId: question.tagId,
        language: "java",
        questionId: question.id,
        answerId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithNodeIDE() {
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
      const question = await fetchQuestion(response.data.data.questionId);
      instance.post("compiler/compile", {
        imageId: question.imageId,
        tagId: question.tagId,
        language: "node",
        questionId: question.id,
        answerId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithCIDE() {
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
      const question = await fetchQuestion(response.data.data.questionId);
      instance.post("compiler/compile", {
        imageId: question.imageId,
        tagId: question.tagId,
        language: "c",
        questionId: question.id,
        answerId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithRubyIDE() {
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
      const question = await fetchQuestion(response.data.data.questionId);
      instance.post("compiler/compile", {
        imageId: question.imageId,
        tagId: question.tagId,
        language: "ruby",
        questionId: question.id,
        answerId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
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
