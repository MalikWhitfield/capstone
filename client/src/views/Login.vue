<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col mt-2">
        <form v-if="loginForm" @submit.prevent="login">
          <input type="email" placeholder="enter email" v-model="creds.email">
          <input type="password" placeholder="password" v-model="creds.password">
          <button type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" placeholder="enter Username" v-model="newUser.name">
          <input type="email" placeholder="enter email" v-model="newUser.email">
          <input type="password" placeholder="password" v-model="newUser.password">
          <button type="submit">Register</button>
        </form>
        <div class="action" @click="loginForm = !loginForm">
          <p v-if="loginForm">No Account? Click here to Register</p>
          <p v-else>Already have an account? Click here to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      }
    },
    computed: {},
    methods: {
      register() {
        this.$store.dispatch('register', this.newUser)
      },
      login() {
        this.$store.dispatch('login', this.creds);
      }
    }
  }

</script>

<style>


</style>