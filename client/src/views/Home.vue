<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <!-- ADD POST BUTTON AND FORM -->
      <div class="col-12">

      </div>
    </div>
    <div class="row">

      <!-- USER SIDEBAR COMPONENT -->
      <div class="col-4">
        <User v-if="user._id" />
      </div>

      <!-- PUBLIC FEED -->
      <div class="col-6">
        <post v-for="post in posts" :key="post._id" :postData="post"></post>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import User from "@/components/User.vue"
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
      };
    },
    mounted() {
      this.$store.dispatch("getPosts");
      // this.$store.dispatch("getUser");
    },
    computed: {
      posts() {
        // return this.$store.state.posts || [];
        let posts = this.$store.state.posts || [];
        posts.forEach(p => {
          p.totalLikes = Object.keys(p.likes).length
        })
        return posts
      },
      user() {
        return this.$store.state.user
      },
    },
    methods: {
      getPosts() {
        this.$store.dispatch('getPosts')
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
      Post,
      User
    }
  }
</script>