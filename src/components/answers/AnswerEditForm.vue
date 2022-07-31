<template>
  <div class="contents">
    <h1 class="page-header">Edit Answer</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea id="content" type="text" rows="5" v-model="content" />
          <p
            v-if="!isContentValid"
            class="validation-text warning isContentTooLong"
          >
            Content length must be less than 250
          </p>
        </div>
        <button type="submit" class="btn">Edit</button>
        <div>
          Save Answer and Use IDE???
          <button type="button" @click="submitEditWithIDE" class="btn">
            YES!
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
import { fetchAnswer, editAnswer } from "@/api/answers";
// import { fetchQuestion } from "@/api/questions";
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      content: "",
      logMessage: "",
      imageId: "",
      tagId: "",
      language: "",
    };
  },
  computed: {
    isContentValid() {
      return this.content.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      const id = this.$route.params.answerId;
      try {
        await editAnswer(id, {
          title: this.title,
          content: this.content,
        });
        this.$router.push(`/question/${this.$route.params.questionId}`);
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },
    async submitEditWithIDE() {
      let response;
      try {
        response = await editAnswer(this.$route.params.answerId, {
          title: this.title,
          content: this.content,
        });
        this.$router.push(`/question/${this.$route.params.questionId}`);
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      // const question = await fetchQuestion(this.$route.params.questionId);
      instance.post("compiler/compile", {
        imageId: this.imageId,
        tagId: this.tagId,
        language: this.language,
        questionId: this.$route.params.questionId,
        answerId: this.$route.params.answerId,
      });
      await setTimeout(() => {
        window.open(this.$store.state.ideurl);
        console.log("after");
      }, 3000);
      // this.submitForm();
    },
  },
  async created() {
    const id = this.$route.params.answerId;
    const { data } = await fetchAnswer(id);
    this.title = data.data.title;
    this.content = data.data.content;
    this.imageId = data.data.imageId;
    this.tagId = data.data.tagId;
    this.language = data.data.language;
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
