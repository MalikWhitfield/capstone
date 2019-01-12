<template>
  <div class="container-fluid">
    <div class="col-4">
      <User v-if="user._id" />
    </div>
  </div>
</template>

<script>
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
      User
    }
  }

</script>

<style>


</style>