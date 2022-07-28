<template>
  <div class="contents block">
    <h1>ㄴ</h1>
    <li>
      <div class="block">
        <div class="author">
          by
          <span class="orange">{{ aCommentItem.userName }}</span
          >&nbsp;
          <span style="font-size: x-small"
            >at &nbsp;&nbsp;{{ aCommentItem.createdDate }}</span
          >
        </div>
      </div>
      <div class="text-container block">
        <pre>{{ aCommentItem.content }}</pre>
      </div>
      <div
        v-if="aCommentItem.userEmail === $store.getters.getUserEmail"
        class="edit"
      >
        <!-- <i class="icon ion-md-create" @click="routeEditPage"></i> -->
        <i class="icon ion-md-trash" @click="deleteItem"></i>
      </div>
    </li>
  </div>
</template>

<script>
import { deleteAComment } from "@/api/acomments";

export default {
  props: {
    aCommentItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // id: "",
      // title: "",
      // content: "",
      // createdDate: "",
      // userEmail: "",
      // userName: "",
      logMessage: "",
    };
  },
  // computed: {
  //   isContentValid() {
  //     return this.content.length <= 200;
  //   },
  // },
  methods: {
    async deleteItem() {
      if (confirm("You want to delete it?")) {
        await deleteAComment(this.aCommentItem.id);
        this.$emit("refresh");
      }
    },
    // routeEditPage() {
    //   console.log(
    //     `/question/${this.$route.params.id}/answer/edit/${this.aCommentItem.id}`
    //   );
    //   this.$router.push(
    //     `/question/${this.$route.params.id}/answer/edit/${this.aCommentItem.id}`
    //   );
    // },
  },
  // async created() {
  //   this.id = this.$route.params.id;
  //   const { data } = await fetchQuestion(this.id);
  //   this.title = data.data.title;
  //   this.content = data.data.content;
  //   this.createdDate = data.data.createdDate;
  //   this.userEmail = data.data.userEmail;
  //   this.userName = data.data.userName;
  // },
};
</script>

<style scoped>
h1 {
  text-align: left;
  font-weight: 100;
}
.orange {
  color: #fe9616;
}
.edit {
  float: right;
}
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
.text-container {
  margin: 0px;
  padding: 0px;
  border: 3px solid #7d8583;
  border-radius: 5px;
}
.author {
  font-size: small;
}
.contents {
  display: flex;
  position: relative;
  flex-grow: 1;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  margin: 7px;
  padding: 10px 20px;
  /* background: white; */
  background: #7d8583;
  background-color: #7d8583;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}
.block {
  overflow: hidden;
  /* padding: 10px; */
  /* margin-top: 10px; */
  height: auto;
  /* background-color: #f9f9f9; */
  background-color: #7d8583;
  background: #7d8583;
}
pre {
  margin: 0px;
}
li {
  width: 1000px;
  display: inline-block;
}
/* template {
  background-color: #7d8583;
} */
</style>
