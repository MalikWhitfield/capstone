<template>
    <div class="user-profile">
        <div class="row">
            <!-- <div class="col-12">
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a class="navbar-brand" href="#">
                        {{user.name}}
                    </a>
                </nav>
            </div> -->
        </div>
        <div class="row">
            <div class="col-4">
                <user />
            </div>
            <div class="col-6">
                <post v-for="post in posts" :key="post._id" :postData="post" />
            </div>
        </div>
    </div>
</template>

<script>
    import Post from "@/components/Post.vue"
    import User from "@/components/User.vue"
    export default {
        name: 'userprofile',
        props: ['userId'],
        components: { Post, User },
        data() {
            return {

            }
        },
        mounted() {
            if (!this.posts.length) {
                this.$store.dispatch("getPosts");
            }
            this.$store.dispatch("getUser", this.$route.params.userId);
        },
        computed: {
            posts() {
                return this.$store.state.posts.filter(post => post.authorId == this.userId) || [];
            },
            user() {
                return this.$store.state.viewedUser
            }
        },
        methods: {}
    }

</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
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

    .hover {
        cursor: pointer;
    }
</style>