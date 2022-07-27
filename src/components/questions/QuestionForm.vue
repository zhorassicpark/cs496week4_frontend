<template>
  <div class="contents block">
    <div class="block">
      <div>
        <h1>
          {{ title }}
        </h1>
      </div>
      <div class="author">
        Asked by
        <span class="orange">{{ userName }}</span
        >&nbsp;
        <span style="font-size: x-small">at &nbsp;&nbsp;{{ createdDate }}</span>
      </div>
    </div>
    <!-- <div>
      ===================================================================================
    </div> -->
    <div class="text-container block">
      <pre>{{ content }}</pre>
    </div>
    <div v-if="userEmail === $store.getters.getUserEmail" class="edit">
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div>
  </div>
</template>

<script>
import { deleteQuestion, fetchQuestion } from "@/api/questions";

export default {
  data() {
    return {
      id: "",
      title: "",
      content: "",
      createdDate: "",
      userEmail: "",
      userName: "",
      logMessage: "",
    };
  },
  computed: {
    isContentValid() {
      return this.content.length <= 200;
    },
    contentForShow() {
      return this.content.replaceAll("\n", "<br/>");
    },
  },
  methods: {
    // async submitForm() {
    //   const id = this.$route.params.id;
    //   try {
    //     await editQuestion(id, {
    //       title: this.title,
    //       content: this.content,
    //     });
    //     this.$router.push("/qanda");
    //   } catch (error) {
    //     console.log(error);
    //     this.logMessage = error;
    //   }
    // },
    async deleteItem() {
      if (confirm("You want to delete it?")) {
        await deleteQuestion(this.questionItem.id);
        this.$emit("refresh");
      }
    },
    routeEditPage() {
      this.$router.push(`/question/edit/${this.id}`);
    },
  },
  async created() {
    this.id = this.$route.params.id;
    const { data } = await fetchQuestion(this.id);
    this.title = data.data.title;
    this.content = data.data.content;
    this.createdDate = data.data.createdDate;
    this.userEmail = data.data.userEmail;
    this.userName = data.data.userName;
  },
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
  /* margin: 10px; */
  float: right;
}
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
.text-container {
  margin: 5px;
  padding: 5px;
  border: 3px solid #7d8583;
  border-radius: 5px;
}
.author {
  font-size: small;
  /* float: right; */
}
.contents {
  display: inline-block;
  position: relative;
  flex-grow: 1;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin: 7px;
  padding: 10px 20px;
  background: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}
.block {
  overflow: hidden;
  padding: 10px;
  margin-top: 10px;
  height: auto;
  background-color: #f9f9f9;
}
pre {
  margin: 0px;
}
</style>
