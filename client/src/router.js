import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from './views/Home.vue'
// @ts-ignore
import Login from './views/Login.vue'

// @ts-ignore
import UserProfile from './views/UserProfile.vue'
// @ts-ignore
import HobbiesPage from './views/HobbiesPage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        // @ts-ignore
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/allhobbies',
      name: 'hobbiPage',
      component: HobbiesPage,
    },
    {
      path: '/:userId',
      name: 'userprofile',
      props: true,
      component: UserProfile
    }
  ]
})
