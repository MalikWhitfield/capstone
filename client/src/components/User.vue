<template>
  <div class="User">
    <div class="card" style="width: 12rem;">
      <img class="card-img-top" src="user.image" height="150px" width="150px" alt="User Image">
      <!-- need to allow users to set a profile image -->
      <div class="card-body">
        <h5 class="card-title">{{user.name}}</h5>
        <p class="card-text">{{user.bio}}</p>
        <!-- new to allow users to create a bio -->
      </div>
      <ul class="list-group list-group-flush">
        <!-- need to write a v-for Hobbies here -->
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      <div class="card-body">
        <button>Follow</button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {}
  }

</script>

<style>


</style>