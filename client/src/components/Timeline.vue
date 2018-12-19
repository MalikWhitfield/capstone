<template>
  <div class="timeline">
    <div class="row">
      <div class="col-12">
        <div v-for="post in posts" :key="post._id"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeline",
  props: ["postId"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getPosts");
  },
  computed: {
    posts() {
      return this.$store.state.posts || [];
    }
  },
  methods: {}
};
</script>

<style>
</style>