<template>
  <div class="container-fluid">
    <!-- CARD FOR EACH POST -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center pt-1 pb-1">
        <router-link :to="{name: 'userprofile', params: { userId: postData.authorId._id}}">
          <img :src="postData.authorId.image" height="30rem" width="30rem" @click="getUser(postData.authorId._id)">
        </router-link>
        <h5 class="post-author">{{postData.authorId.name}}</h5>
        <p>{{postData.createdAt}}</p>
        <!-- Do we want this h4 to be a router-link instead? So that when someone clicks on the postData.authorImage, they are brought to the UserProfile vue? -->
      </div>
      <div class="card-img-top">
        <img :src="postData.image || postData.video" height="250rem" max-width="30rem;">
        <p>{{postData.content}}</p>
        <p v-for="hobby in postData.hobbiTags"><strong>#{{hobby}}</strong></p>

      </div>
      <div class="card-body">
        <i class="fas fa-award mr-3 hover icon-size" @click="likePost(postData._id)"> <strong>
            {{postData.totalLikes}}</strong></i>
      </div>
      <div class="card-subtitle">
        <blockquote class="blockquote mb-0">
          </footer>
        </blockquote>
        <i v-if="postData.authorId._id == user._id" class="fa fa-trash mb-2 hover" aria-hidden="true" @click="deletePost(postData._id)"></i>
      </div>
      <p class="hover" @click="showComments = !showComments">Show Comments...</p>
      <comments v-if="showComments" v-for="comment in comments" :commentData="comment"></comments>
      <i class="fas fa-comment mb-3 hover" @click="showCommentForm = !showCommentForm"></i>
      <!-- ADD COMMENTS ON POSTS -->
      <form v-if="showCommentForm" @submit.prevent="addComment(postData._id)">
        <input type="text" placeholder="Add Comment" v-model="newComment.content">
        <button type="submit" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i></button>
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
        showComments: false,

      }
    },
    mounted() {
      this.$store.dispatch('getComments', this.postData._id);
    },
    computed: {
      // posts() {
      //   let posts = this.$store.state.posts || [];
      //   posts.forEach(p => {
      //     p.totalLikes = Object.keys(this.postData.likes).length
      //   })
      //   return posts
      // },
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
      getUser(id) {
        this.$store.dispatch('getUser', id)
      }
    },
    components: {
      Comments
    }
  }

</script>

<style>
  .card {
    color: whitesmoke;
    border-color: #42b983
  }

  .icon-size {
    font-size: 25px
  }

  .post-author {
    margin-right: 90px
  }
</style>