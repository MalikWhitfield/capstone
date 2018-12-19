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
        <div v-for="post in posts" :key="post._id">
          <div class="card">
            <img class="card-img-top" :src="post.image || post.video" height="250rem" width="100rem">
            <div class="card-body">
              <div class="card-subtitle">
                <h6><strong>This will be Hobby Tags</strong></h6>
              </div>
              <blockquote class="blockquote mb-0">
                <p>{{post.content}}</p>
                <footer class="blockquote-footer">
                  <cite title="Source Title">{{post.authorName}} <img :src="post.authorImage" height="30rem" width="30rem">
                    ||
                    {{post.createdAt}}</cite>
                </footer>
              </blockquote>
            </div>
            <i v-if="!user.id" class="fa fa-trash mb-2 hover" aria-hidden="true" @click="deletePost(post._id)"></i>
          </div>
        </div>
        <comments></comments>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  import Comments from '@/components/Comments.vue'
  export default {
    name: "home",
    data() {
      return {
        newPost: {
          content: "",
          video: "",
          image: ""
        },
        showAddPost: false
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
      }
    },
    components: {
      Comments
    }
  }
</script>