<template>
  <div class="user-profile container-fluid">
    <div class="row"></div>
    <div class="row">
      <div class="col-4">
        <user />
      </div>
      <div class="col-6">
        <div v-if="!activeHobbi._id">
          <post v-for="post in posts" :key="post._id" :postData="post" />
        </div>
        <div v-else>
          <post v-for="hobbiPost in hobbiPosts" :key="hobbiPost._id" :postData="hobbiPost" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Post from "@/components/Post.vue";
  import User from "@/components/User.vue";
  export default {
    name: "userprofile",
    props: ["userId"],
    components: { Post, User },
    data() {
      return {};
    },
    mounted() {
      if (!this.posts.length) {
        this.$store.dispatch("getPosts");
      }
      this.$store.dispatch("getUser", this.$route.params.userId);
    },
    computed: {
      posts() {
        return (
          this.$store.state.posts.filter(
            post => post.authorId._id == this.userId
          ) || []
        );
      },
      activeHobbi() {
        return this.$store.state.activeHobbi;
      },
      user() {
        return this.$store.state.viewedUser;
      },
      hobbiPosts() {
        return this.$store.state.posts.filter(
          post => {
            return post.authorId._id == this.user._id && post.hobbiTags.includes(this.activeHobbi.name.toLowerCase())
          }) || [];
      }
    },
    methods: {}
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .icon {
    color: whitesmoke;
    font-size: 20px;
  }

  .hover {
    cursor: pointer;
  }
</style>