<template>
  <li @click="moveToQuestion">
    {{ questionItem.numLike }}
    <div class="post-title">
      {{ questionItem.title }}
      <span class="author">
        Asked by
        <span style="color: #fe9616">{{ questionItem.userName }}</span
        >&nbsp;
        <span style="font-size: x-small"
          >at &nbsp;&nbsp;{{ questionItem.createdDate }}</span
        >
      </span>
    </div>
    <!-- <div class="post-contents">
      {{ questionItem.content }}
    </div> -->
    <!-- <div
      v-if="questionItem.userEmail === $store.getters.getUserEmail"
      class="post-time"
    >
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div> -->
  </li>
</template>

<script>
// import { deleteQuestion } from "@/api/questions";

export default {
  props: {
    questionItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    moveToQuestion() {
      this.$router.push(`/question/${this.questionItem.id}`);
    },
    // async deleteItem() {
    //   if (confirm("You want to delete it?")) {
    //     await deleteQuestion(this.questionItem.id);
    //     this.$emit("refresh");
    //   }
    // },
    // routeEditPage() {
    //   const id = this.questionItem.id;
    //   this.$router.push(`/question/edit/${id}`);
    // },
  },
};
</script>

<style scoped>
.author {
  font-size: small;
  float: right;
}
</style>
