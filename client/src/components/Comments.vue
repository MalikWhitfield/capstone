<template>
  <div class="comment">
    <p>{{commentData.content}}</p>
    <footer class="blockquote-footer">
      <cite title="Source Title">{{commentData.authorName}} <img :src="commentData.authorImage" height="30rem" width="30rem">
        ||
        {{commentData.createdAt}}</cite>
    </footer>
  </div>

</template>

<script>
  export default {
    name: 'comments',
    props: ['commentData'],
    data() {
      return {

      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {}
  }

</script>

<style>


</style>