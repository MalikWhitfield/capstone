<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <!-- ADD POST BUTTON AND FORM -->
      <div class="col-12">
        <div v-if="user._id">
          <i class="fa fa-plus icon1 hover" aria-hidden="true" @click="showAddPost= !showAddPost"></i>
          <form v-if="showAddPost" @submit.prevent="addPost">
            <input type="text" placeholder="Hobbi Name Here" v-model="newPost.hobbiTags" required: true>
            <input
              type="text"
              placeholder="Image Link Here"
              v-model="newPost.image"
            >
            <input type="text" placeholder="Video Link Here" v-model="newPost.video">
            <input type="text" placeholder="Caption/Content Here" v-model="newPost.content" required: true>
            <button
              type="submit"
              class="btn btn-success"
            >Add Post</button>
          </form>
          <div>
            <i class="fas fa-sync icon1 hover" @click="getPosts"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex flex-row">
      <!-- USER SIDEBAR COMPONENT -->
      <div class="col-4 col-12-sm">
        <User v-if="user._id"/>
      </div>

      <!-- PUBLIC FEED -->
      <div class="col-8 col-12-sm">
        <post v-for="post in posts" :key="post._id" :postData="post"></post>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from "@/components/User.vue";
import Post from "@/components/Post.vue";
export default {
  name: "home",
  data() {
    return {
      newPost: {
        content: "",
        video: "",
        image: "",
        hobbiTags: ""
      },
      newComment: {
        content: "",
        postId: ""
      },
      showAddPost: false
    };
  },
  mounted() {
    this.$store.dispatch("getPosts");
  },
  computed: {
    posts() {
      // return this.$store.state.posts || [];
      let posts = this.$store.state.posts || [];
      posts.forEach(p => {
        if (!p.likes) {
          return (p.totalLikes = 0);
        }
        p.totalLikes = Object.keys(p.likes).length;
      });
      return posts;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    getPosts() {
      this.$store.dispatch("getPosts");
    },
    addPost() {
      this.newPost.hobbiTags = this.newPost.hobbiTags.toLowerCase();
      this.$store.dispatch("addPost", this.newPost);
      this.showAddPost = false;
    },
    deletePost(postId) {
      this.$store.dispatch("deletePost", postId);
    },
    likePost(postId) {
      this.$store.dispatch("likePost", postId);
    },
    addComment(postId) {
      let payload = {
        postId: postId,
        content: this.newComment.content
      };
      this.$store.dispatch("addComment", payload);
      this.showCommentForm = false;
    }
  },
  components: {
    Post,
    User
  }
};
</script>
<style scoped>
.icon1 {
  color: whitesmoke;
  font-size: 20px;
}
</style>