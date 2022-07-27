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
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { createAnswer } from "@/api/answers";

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
