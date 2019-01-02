<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        myHobb
        <i class="fas fa-info-circle icon"></i>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li v-if="!user._id" class="nav-item action">
            <router-link class="nav-link" :to="{name: 'login'}">Login/Register</router-link>
          </li>
          <li v-else class="nav-item action" @click="logout">
            <a class="nav-link hover">Logout</a>
          </li>
          <li v-if="user._id" @click="setUser()" class="nav-item action">
            <router-link class="nav-link" :to="{name: 'userprofile', params: { userId: user._id}}">{{user.name}}</router-link>
          </li>
          <li v-if="user._id" class="nav-item action" @click="">
            <i class="fa fa-plus icon hover " aria-hidden="true" @click="showAddPost= !showAddPost"></i>
            <form v-if="showAddPost" @submit.prevent="addPost">
              <input type="text" placeholder="Image Link Here" v-model="newPost.image">
              <input type="text" placeholder="Video Link Here" v-model="newPost.video">
              <input type="text" placeholder="Caption/Content Here" v-model="newPost.content" required: true>
              <button type="submit">Add Post</button>
            </form>
            <i class="fas fa-sync icon ml-3" @click="getPosts"></i>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>


<script>
  export default {
    data() {
      return {
        showAddPost: false,
      }

    },
    mounted() {
      this.$store.dispatch("authenticate");
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      },
      setUser() {
        this.$store.commit('setDefaultUser')
      },
      addPost() {
        this.$store.dispatch('addPost', this.newPost)
        this.showAddPost = false
      },
      getPosts() {
        this.$store.dispatch('getPosts')
      }
    }
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