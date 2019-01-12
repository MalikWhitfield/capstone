<template>
  <div class="container-fluid">
    <div class="row">
      <h2 class="w p-3 hover" v-for="(postArray, hobbiName) in hobbies" @click="posts = postArray">{{hobbiName}}</h2>
      <post v-for="post in posts" :key="post._id" :postData="post"></post>
    </div>
  </div>
</template>

<script>
  import Post from "@/components/Post.vue"
  export default {
    name: 'hobbies',
    data() {
      return {
        posts: []
      }
    },
    computed: {
      hobbies() {
        return this.$store.state.hobbies
      }
    },
    methods: {},
    components: {
      Post
    }
  }

</script>

<style>
  .w {
    color: whitesmoke;
    width: fit-content;
    cursor: pointer;
  }
</style>