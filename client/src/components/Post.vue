<template>
  <div class="container-fluid">
    <!-- CARD FOR EACH POST -->
    <div class="card">
      <div class="card-header d-flex justify-content-start">
        <h4><img :src="postData.authorImage" height="30rem" width="30rem"> {{postData.authorName}}</h4>
      </div>
      <img class="card-img-top" :src="postData.image || postData.video" height="250rem" width="100rem">
      <div class="card-body">
        <div class="card-subtitle">
          <h6><strong>This will be Hobby Tags</strong></h6>
          <i class="fas fa-award mr-3 hover" @click="likePost(postData._id)"></i>
          <p> <strong>Likes: {{postData.likes}}</strong> </p>
        </div>
        <blockquote class="blockquote mb-0">
          <p>{{postData.content}} </p>
          <p>{{postData.createdAt}}</p>
          </footer>
        </blockquote>
        <i v-if="!user.id" class="fa fa-trash mb-2 hover" aria-hidden="true" @click="deletePost(postData._id)"></i>
      </div>
      <p class="hover" @click="showComments = !showComments">Show Comments...</p>
      <comments v-if="showComments" v-for="comment in comments" :commentData="comment"></comments>
      <i class="fas fa-comment mb-2 hover" @click="showCommentForm = !showCommentForm"></i>


      <!-- ADD COMMENTS ON POSTS -->
      <form v-if="showCommentForm" @submit.prevent="addComment(postData._id)">
        <input type="text" placeholder="Add Comment" v-model="newComment.content">
        <button type="submit"><i class="fa fa-plus" aria-hidden="true"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
  import Comments from "@/components/Comments.vue"
  export default {
    name: 'post',
    props: ['postData'],
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
        showCommentForm: false,
        showComments: false
      }
    },
    mounted() {
      this.$store.dispatch('getComments', this.postData._id);
    },
    computed: {
      posts() {
        return this.$store.state.posts || [];
      },
      user() {
        return this.$store.state.user
      },
      comments() {
        return this.$store.state.comments[this.postData._id] || {}
      }
    },
    methods: {
      addComment(postId) {
        let payload = {
          postId: postId,
          content: this.newComment.content
        }
        this.$store.dispatch('addComment', payload)
        this.showCommentForm = false
      },
      likePost(postId) {
        this.$store.dispatch('likePost', postId)
      },
      deletePost(postId) {
        this.$store.dispatch('deletePost', postId)
      },

    },
    components: {
      Comments
    }
  }

</script>

<style>


</style>