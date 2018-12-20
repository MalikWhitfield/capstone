<template>
  <div class="container-fluid">
    <div class="row justify-content-center">

      <!-- ADD POST BUTTON AND FORM -->
      <div class="col-12">
        <div v-if="!user.id">
          <i class="fa fa-plus" aria-hidden="true" @click="showAddPost= !showAddPost"></i>
          <form v-if="showAddPost" @submit.prevent="addPost">
            <input type="text" placeholder="Image Link Here" v-model="newPost.image">
            <input type="text" placeholder="Video Link Here" v-model="newPost.video">
            <input type="text" placeholder="Caption/Content Here" v-model="newPost.content" required: true>
            <button type="submit">Add Post</button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">

      <!-- USER SIDEBAR COMPONENT -->
      <div class="col-4"></div>

      <!-- PUBLIC FEED -->
      <div class="col-6">
        <post v-for="post in posts" :key="post._id" :postData="post"></post>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  import Post from "@/components/Post.vue"
  export default {
    name: "home",
    data() {
      return {
        newPost: {
          content: "",
          video: "",
          image: ""
        },
        newComment: {
          content: '',
          postId: ''
        },
        showAddPost: false,
      };
    },
    mounted() {
      this.$store.dispatch("getPosts");
      // this.$store.dispatch("getUser");
    },
    computed: {
      posts() {
        return this.$store.state.posts || [];
      },
      user() {
        return this.$store.state.user
      },
    },
    methods: {
      addPost() {
        this.$store.dispatch('addPost', this.newPost)
        this.showAddPost = false
      },
      deletePost(postId) {
        this.$store.dispatch('deletePost', postId)
      },
      likePost(postId) {
        this.$store.dispatch('likePost', postId)
      },
      addComment(postId) {
        let payload = {
          postId: postId,
          content: this.newComment.content
        }
        this.$store.dispatch('addComment', payload)
        this.showCommentForm = false
      }
    },
    components: {
      Post
    }
  }
</script>