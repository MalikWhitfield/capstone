<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <User v-if="user._id" />
      </div>
      <div class="col-6">
        <hobbies></hobbies>
      </div>
    </div>
  </div>
</template>

<script>
  import Hobbies from "@/components/Hobbies.vue"
  import User from '@/components/User.vue'
  export default {
    name: 'hobbiesPage',
    data() {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
    },
    methods: {},
    components: {
      User,
      Hobbies
    }
  }

</script>

<style>


</style>