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
    posts: [],
    comments: {},
    hobbies: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
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
    }
  },
  actions: {
    //AUTHENTICATION
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
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
          router.push({ name: 'home', path: '/home' })
          commit('setUser', {})
        })
    },
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home', path: '/home' })
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
          commit('setPosts', newPost)
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
    }
  }
})
