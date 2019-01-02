<template>
  <div class="User">
    <div class="card" style="width: 12rem;">
      <router-link :to="{name: 'userprofile', params: { userId: user._id}}">
        <img class="card-img-top" :src="viewedUser.image || user.image" height="auto" max-height="400px" alt="User Image"
          @click="setUser()">
      </router-link>
      <!-- need to allow users to set a profile image -->
      <div class="card-body">
        <div class="d-flex justify-content-end"> <i class="fas fa-user-edit hover" @click="showEditUser = !showEditUser"></i>
        </div>
        <h5 class="card-title"><strong>{{ viewedUser.name ||user.name }} </strong></h5>
        <p class="card-text">{{viewedUser.bio || user.bio}} </p>
        <!-- new to allow users to create a bio -->
      </div>
      <ul class="list-group list-group-flush">
        <!-- need to write a v-for Hobbies here -->
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      <button v-if="!viewedUser || viewedUser._id !== user._id" class="btn btn-primary">Follow
      </button>


      <!-- EDIT USER FORM -->
      <form v-if="showEditUser" @submit.prevent="editUser(user._id)">
        <input type="text" v-model="user.name" placeholder="Name">
        <input type="text" v-model="user.bio" placeholder="Bio">
        <input type="text" v-model="user.image" placeholder="Image Url">
        <button type="submit">Save</button>
      </form>
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        showEditUser: false,
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      viewedUser() {
        return this.$store.state.viewedUser
      }
    },
    methods: {
      setUser() {
        this.$store.commit('setDefaultUser')
      },
      editUser(id) {
        this.$store.dispatch('editUser', this.user)
      }
    }
  }

</script>

<style>


</style>