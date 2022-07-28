<template>
  <div class="contents">
    <h1 class="page-header">Create Question</h1>
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
        Save Question and Use IDE???
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
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { createQuestion } from "@/api/questions";
import axios from "axios";

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
        const response = await createQuestion({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
        });
        this.$router.push("/qanda");
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
    async submitWithPythonIDE() {
      let response;
      try {
        response = await createQuestion({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
        });
        this.$router.push("/qanda");
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      instance.post("compiler/compile", {
        imageId: "fee6eb90-0e37-11ed-9553-ab913a6707e5",
        language: "python",
        questionId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithJavaIDE() {
      let response;
      try {
        response = await createQuestion({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
        });
        this.$router.push("/qanda");
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      instance.post("compiler/compile", {
        language: "java",
        questionId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithNodeIDE() {
      let response;
      try {
        response = await createQuestion({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
        });
        this.$router.push("/qanda");
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      instance.post("compiler/compile", {
        language: "node",
        questionId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithCIDE() {
      let response;
      try {
        response = await createQuestion({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
        });
        this.$router.push("/qanda");
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      instance.post("compiler/compile", {
        language: "c",
        questionId: response.data.data.id,
      });
      window.open(this.$store.state.ideurl);
      // this.submitForm();
    },
    async submitWithRubyIDE() {
      let response;
      try {
        response = await createQuestion({
          title: this.title,
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
        });
        this.$router.push("/qanda");
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      instance.post("compiler/compile", {
        language: "ruby",
        questionId: response.data.data.id,
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
