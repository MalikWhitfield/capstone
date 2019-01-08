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
      }
    }
  };
</script>

<style scoped>
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