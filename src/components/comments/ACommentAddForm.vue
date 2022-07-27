<template>
  <div class="contents">
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <textarea id="contents" type="text" rows="2" v-model="content" />
          <p
            v-if="!isContentValid"
            class="validation-text warning isContentTooLong"
          >
            Content length must be less than 250
          </p>
        </div>
        <button type="submit" class="btn">Add Comment</button>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { createAComment } from "@/api/acomments";

export default {
  props: {
    answerItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
        const response = await createAComment({
          content: this.content,
          createdDate: new Date(),
          userId: this.$store.getters.getUserEmail,
          answerId: this.answerItem.id,
        });
        // this.$router.push("/qanda");
        console.log(response);
        this.$emit("refresh");
        this.$emit("addCommentFinished", this.answerItem.id);
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
  height: 30px;
  font-size: 50%;
}
.commentbtn {
  float: right;
}
</style>
