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
    comments: [],
    hobbies: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    logout(state) {
      state.user = {}
      router.push({ name: 'home', path: '/home' })
    }
  },
  actions: {
    //AUTHENTICATION
    logout({ commit, dispatch }) {
      auth.delete('/logout')
        .then(res => {
          commit('logout')
        })
    },

    //POSTS
    getPosts({ commit, dispatch }) {
      api.get('/posts')
        .then(res => {
          commit('setPosts', res.data)
        })
    },

  }
})
