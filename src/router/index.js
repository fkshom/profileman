import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Server from '../views/Server.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/server',
    name: 'Server',
    component: Server
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
