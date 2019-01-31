<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">myHobbi
        <!-- <i class="fas fa-info-circle icon"></i> -->
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link hover" :to="{name: 'hobbiPage'}">Hobbies</router-link>
          </li>
          <li v-if="!user._id" class="nav-item action">
            <router-link class="nav-link" :to="{name: 'login'}">Login/Register</router-link>
          </li>
          <li v-else class="nav-item action" @click="logout">
            <a class="nav-link hover">Logout</a>
          </li>
          <li v-if="user._id" @click="setUser()" class="nav-item action">
            <router-link
              class="nav-link"
              :to="{name: 'userprofile', params: { userId: user._id}}"
            >{{user.name}}</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>


<script>
export default {
  data() {
    return {};
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
      this.$store.commit("setDefaultUser");
    }
  }
};
</script>

<style scoped>
.container-fluid {
  /* best practice to not use important tags unless need to combant bootstrap styling */
  padding: 0 !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 100vw;
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
.navbar {
  width: 100vw;
  margin-left: 0;
}

.hover {
  cursor: pointer;
}
</style>