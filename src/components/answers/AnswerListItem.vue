<template>
  <div class="topdiv">
    <div
      class="num-like"
      :class="{ userLikedIt: userLikedIt }"
      @click="toggleLikeAnswer"
    >
      <div class="ranking"><h4 class="ranking">^</h4></div>
      <div class="ranking">{{ answerItem.numLike }}</div>
      <div class="ranking">v</div>
    </div>
    <div class="contents block">
      <li>
        <div
          v-if="answerItem.userEmail === $store.getters.getUserEmail"
          class="edit"
        >
          <i class="icon ion-md-create" @click="routeEditPage"></i>
          <i class="icon ion-md-trash" @click="deleteItem"></i>
        </div>
        <div class="block">
          <h1>
            {{ answerItem.title }}
          </h1>
        </div>
        <div class="author">
          Answered by
          <span class="orange">{{ answerItem.userName }}</span
          >&nbsp;
          <span style="font-size: x-small"
            >at &nbsp;&nbsp;{{ answerItem.createdDate }}</span
          >
        </div>
        <div class="text-container block">
          <pre>{{ answerItem.content }}</pre>
        </div>
        <!-- <TestTest></TestTest>
      <i class="fa-solid fa-arrow-turn-down-right"></i>
      <QCommentListItem></QCommentListItem> -->
        <div>
          <button class="btn" @click="addComment">Add Comment</button>
          <button
            class="btn"
            v-if="answerItem.imageId != null"
            @click="viewIDEAnswer"
          >
            View Answer's IDE
          </button>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { deleteAnswer } from "@/api/answers";
import { getLikeAnswerApi, toggleLikeAnswerApi } from "@/api/likes";
import axios from "axios";
// import { QCommentListItem } from "@/components/comments/QCommentListItem";
// import { TestTest } from "@/components/comments/TestTest";

export default {
  components: {
    // QCommentListItem,
    // TestTest,
  },
  props: {
    answerItem: {
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
      userLikedIt: "",
      logMessage: "",
    };
  },
  computed: {
    isContentValid() {
      return this.content.length <= 200;
    },
  },
  methods: {
    async deleteItem() {
      if (confirm("You want to delete it?")) {
        await deleteAnswer(this.answerItem.id);
        this.$emit("refresh");
      }
    },
    routeEditPage() {
      console.log(
        `/question/${this.$route.params.id}/answer/edit/${this.answerItem.id}`
      );
      this.$router.push(
        `/question/${this.$route.params.id}/answer/edit/${this.answerItem.id}`
      );
    },
    addComment() {
      this.$emit("addComment", this.answerItem.id);
    },
    async toggleLikeAnswer() {
      await toggleLikeAnswerApi(
        this.$store.getters.getUserEmail,
        this.answerItem.id
      );
      this.$router.go();
      this.$emit("refresh");
    },
    async viewIDEAnswer() {
      const instance = axios.create({
        // baseURL: process.env.VUE_APP_API_URL,
        baseURL: this.$store.state.dockerurl,
      });
      instance.post("compiler/compile", {
        imageId: this.answerItem.imageId,
        tagId: this.answerItem.tagId,
        language: this.answerItem.language,
      });
      await setTimeout(() => {
        window.open(this.$store.state.ideurl);
        console.log("after");
      }, 3000);
    },
    // async submitAnswerWithIDE() {
    //   const instance = axios.create({
    //     // baseURL: process.env.VUE_APP_API_URL,
    //     baseURL: this.$store.state.dockerurl,
    //   });
    //   const { data } = await fetchQuestion(response.data.data.questionId);
    //   const question = data.data;
    //   console.log("PIOST");
    //   console.log(question);
    //   console.log({
    //     imageId: question.imageId,
    //     tagId: null,
    //     language: question.language,
    //     questionId: question.id,
    //     answerId: response.data.data.id,
    //   });
    //   instance.post("compiler/compile", {
    //     imageId: question.imageId,
    //     tagId: null,
    //     language: question.language,
    //     questionId: question.id,
    //     answerId: response.data.data.id,
    //   });
    //   await setTimeout(() => {
    //     window.open(this.$store.state.ideurl);
    //     console.log("after");
    //   }, 3000);
    //   // this.submitForm();
    // },
  },
  async created() {
    const { data } = await getLikeAnswerApi(
      this.$store.getters.getUserEmail,
      this.answerItem.id
    );
    if (data.data == null) {
      this.userLikedIt = false;
    } else {
      this.userLikedIt = true;
    }
    //   this.id = this.$route.params.id;
    //   const { data } = await fetchQuestion(this.id);
    //   this.title = data.data.title;
    //   this.content = data.data.content;
    //   this.createdDate = data.data.createdDate;
    //   this.userEmail = data.data.userEmail;
    //   this.userName = data.data.userName;
  },
};
</script>

<style scoped>
.userLikedIt {
  color: #fe9616;
}
.topdiv {
  width: 100%;
  display: flex;
}
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
  height: 30px;
  font-size: 50%;
  float: right;
}
.text-container {
  margin: 5px;
  padding: 5px;
  border: 3px solid #7d8583;
  border-radius: 5px;
}
.author {
  font-size: small;
}
.contents {
  display: inline-block;
  position: relative;
  flex-grow: 1;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  margin: 7px;
  padding: 10px 20px;
  background: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}
.block {
  overflow: hidden;
  /* padding: 10px; */
  /* margin-top: 10px; */
  height: auto;
  width: 100%;
  background-color: #f9f9f9;
}
pre {
  margin: 0px;
}
.num-like {
  cursor: pointer;
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
</style>
