<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col4"></div>
      <div class="col-8">
        <div v-for="post in posts" :key="post._id">
          <div class="card">
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{{post.content}}</p>
                <footer class="blockquote-footer">
                  Someone famous in
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      newPost: {
        content: "",
        video: "",
        image: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getUser");
  },
  computed: {
    posts() {
      return this.$store.state.posts || [];
    }
  },
  components: {}
};
</script>
