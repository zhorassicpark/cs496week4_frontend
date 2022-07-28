<template>
  <div class="topdiv">
    <div
      class="num-like"
      :class="{ userLikedIt: userLikedIt }"
      @click="toggleLikeQuestion"
    >
      <div class="ranking"><h4 class="ranking">^</h4></div>
      <div class="ranking">
        {{ numLike }}
      </div>
      <div class="ranking">v</div>
    </div>
    <div class="contents block">
      <div v-if="userEmail === $store.getters.getUserEmail" class="edit">
        <i class="icon ion-md-create" @click="routeEditPage"></i>
        <i class="icon ion-md-trash" @click="deleteItem"></i>
      </div>
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
          <span style="font-size: x-small"
            >at &nbsp;&nbsp;{{ createdDate }}</span
          >
        </div>
      </div>
      <!-- <div>
      ===================================================================================
    </div> -->
      <div class="text-container block">
        <pre>{{ content }}</pre>
      </div>
      <button @click="addComment" class="btn">Add Comment</button>
    </div>
  </div>
</template>

<script>
import { deleteQuestion, fetchQuestion } from "@/api/questions";
import { toggleLikeQuestionApi, getLikeQuestionApi } from "@/api/likes";
// import { QCommentListItem } from "@/components/comments/QCommentListItem.vue";

export default {
  // components: {
  //   QCommentListItem,
  // },
  data() {
    return {
      id: "",
      title: "",
      content: "",
      createdDate: "",
      numLike: "",
      userEmail: "",
      userName: "",
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
        await deleteQuestion(this.id);
        this.$router.push("/qanda");
      }
    },
    routeEditPage() {
      this.$router.push(`/question/edit/${this.id}`);
    },
    addComment() {
      console.log("ADD QCOMMENT");
      this.$emit("addQComment");
    },
    async toggleLikeQuestion() {
      await toggleLikeQuestionApi(
        this.$store.getters.getUserEmail,
        this.$route.params.id
      );
      this.$router.go();
      this.$emit("refresh");
    },
  },
  async created() {
    this.id = this.$route.params.id;
    const { data } = await fetchQuestion(this.id);
    this.title = data.data.title;
    this.content = data.data.content;
    this.createdDate = data.data.createdDate;
    this.numLike = data.data.numLike;
    this.userEmail = data.data.userEmail;
    this.userName = data.data.userName;
    const { data: data2 } = await getLikeQuestionApi(
      this.$store.getters.getUserEmail,
      this.$route.params.id
    );
    console.log(data2);
    if (data2.data == null) {
      this.userLikedIt = false;
    } else {
      this.userLikedIt = true;
    }
  },
};
</script>

<style scoped>
.userLikedIt {
  color: #fe9616;
}
.topdiv {
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
  /* margin: 10px; */
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
  /* padding: 10px; */
  /* margin-top: 10px; */
  height: auto;
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
