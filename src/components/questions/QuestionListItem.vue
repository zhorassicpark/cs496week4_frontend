<template>
  <li @click="moveToQuestion">
    <div class="num-like">
      <div class="ranking"><h4 class="ranking">^</h4></div>
      <div class="ranking">{{ questionItem.numLike }}</div>
      <div class="ranking">v</div>
    </div>
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
  text-align: right;
}
li {
  cursor: pointer;
  display: flex;
  vertical-align: middle;
}
.num-like {
  vertical-align: middle;
  text-align: center;
  /* margin-top: 20px; */
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 20px;
  /* margin: 0px; */
}
.ranking {
  vertical-align: middle;
  text-align: center;
  /* margin-top: 20px; */
  margin-top: 0px;
  margin-bottom: 0px;
  /* margin: 0px; */
}
.post-title {
  margin-top: 20px;
  width: 1000px;
}
</style>
