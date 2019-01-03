import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
// import VueRouter from 'vue-router';
import router from "./router"

Vue.use(Vuex)
let baseUrl = '//localhost:9001/'

let auth = Axios.create({
  baseURL: baseUrl + 'auth/',
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: baseUrl + 'api/',
  timeout: 3000,
  withCredentials: true
})


export default new Vuex.Store({
  state: {
    user: {},
    viewedUser: {},
    posts: [],
    comments: {},
    hobbies: [],
    following: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    addPost(state, newPost) {
      state.posts.push(newPost)
    },
    setUser(state, user) {
      state.user = user
    },
    setLikes(state, updatedPost) {
      let index = state.posts.findIndex(post => {
        return post._id == updatedPost._id
      })
      state.posts.splice(index, 1, updatedPost)
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.postId, payload.comments)
    },
    setViewedUser(state, user) {
      state.viewedUser = user
    },
    setDefaultUser(state) {
      state.viewedUser = state.user
    },
    setFollowers(state, payload) {
      state.following = payload
    }
  },
  actions: {
    //AUTHENTICATION
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          dispatch('getFollowing', res.data._id)
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', {})
          router.push({ name: 'home', path: '/home' })
        })
    },
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home', path: '/home' })
        })
    },

    //USERS
    editUser({ commit, dispatch }, payload) {
      api.put('/users/' + payload._id, payload)
        .then(res => {
          commit('setUser', res.data)
          commit('setViewedUser', res.data)
          console.log(res.data)
        })
    },
    getUser({ commit, dispatch }, userId) {
      api.get('/users/' + userId)
        .then(res => {
          commit('setViewedUser', res.data)
        })
    },

    //POSTS
    getPosts({ commit, dispatch }) {
      api.get('/posts')
        .then(res => {
          commit('setPosts', res.data)
        })
    },

    addPost({ commit, dispatch }, newPost) {
      api.post('posts', newPost)
        .then(res => {
          commit('addPost', res.data)
        })
    },
    deletePost({ commit, dispatch }, postId) {
      api.delete('posts/' + postId)
        .then(res => {
          dispatch('getPosts')
        })
    },
    likePost({ commit, dispatch }, postId) {
      api.put('posts/likes/' + postId)
        .then(res => {
          let payload = {
            postId: postId,
            likes: res.data,
          }
          commit('setLikes', payload)
        })
        .catch(err => {
          console.log('Sorry, cannot like post again')
        })
    },

    //COMMENTS
    addComment({ commit, dispatch }, payload) {
      api.post('comments', payload)
        .then(res => {
          dispatch('getComments', payload.postId)
        })
    },
    getComments({ commit, dispatch }, postId) {
      api.get('comments/' + postId)
        .then(res => {
          if (res.data.length) {
            let payload = {
              postId: postId,
              comments: res.data
            }
            commit('setComments', payload)
          }
        })
    },

    //FOLLOWING
    follow({ commit, dispatch }, payload) {
      api.put('users/' + payload.userId + '/follow/' + payload.followingId)
        .then(res => {
          dispatch('getFollowing', payload.userId)
        })
    },
    getFollowing({ commit }, userId) {
      api.get('/users/' + userId + '/following')
        .then(res => {
          commit('setFollowers', res.data)
        })
    },

    //HOBBIES
    addHobby({ commit, dispatch }, payload) {
      api.post('hobbies', payload)
        .then(res => {

        })
    }
  }
})
