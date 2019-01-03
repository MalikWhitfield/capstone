<template>
  <div class="User">
    <div class="card" style="width: 12rem;">
      <img class="card-img-top" :src="viewedUser.image || user.image" height="auto" max-height="400px" alt="User Image">
      <!-- need to allow users to set a profile image -->
      <div class="card-body">
        <div class="d-flex justify-content-end" v-if="user._id && viewedUser._id == user._id"> <i class="fas fa-user-edit hover"
            @click="showEditUser = !showEditUser"></i>
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
      <div>
        <!-- See Following -->
        <div v-if="userId == user._id || !userId">
          <button>View Following</button>
        </div>
        <!-- Follow -->
        <div v-else>
          <button v-if="following">Un-Follow</button>
          <button v-else class="btn btn-primary" @click="follow(viewedUser._id)">Follow
          </button>
        </div>

      </div>


      <!-- EDIT USER FORM -->
      <form v-if="showEditUser" @submit.prevent="editUser()">
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
      },
      following() {
        return this.$store.state.following.find(u => u._id == this.viewedUser._id)
      },
      userId() {
        return this.$route.params.userId
      }
    },
    methods: {
      setUser() {
        this.$store.commit('setDefaultUser')
      },
      editUser() {
        this.$store.dispatch('editUser', this.user)
        this.showEditUser = false
      },
      follow() {
        let payload = {
          userId: this.user._id,
          followingId: this.viewedUser._id
        }
        this.$store.dispatch('follow', payload)
      }
    }
  }

</script>

<style>


</style>