// Vue libaries
import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import { store } from './store.js'

// components
import login from './components/login.vue'
import homepage from './components/homepage.vue'
import end from './components/end.vue'
import takeTest from './components/renderComponents/takeTest.vue'
import notFound from './components/notFound.vue'
import testStats from './components/renderComponents/testStats.vue'
import testResults from './components/renderComponents/testResultsDefault.vue'
import testSubmitted from './components/renderComponents/testSubmitted.vue'
import markResponse from './components/renderComponents/markResponseDefault.vue'

Vue.use(vueRouter)

const routes = [
  {
    path: "/",
    component: login
  },
  {
    path: "/home",
    component: homepage
  },
  {
    path: "/end",
    component: end
  },
  {
    path: "/test",
    component: takeTest
  },
  {
    path: "/testStatistics",
    component: testStats
  },
  {
    path: '/testResults',
    component: testResults
  },
  {
    path: '/testSubmitted',
    component: testSubmitted
  },
  {
    path: '/markResponse',
    component: markResponse
  },
  { 
    path: '/404',
    component: notFound
  },  
  { 
    path: '*',
    redirect: '/404'
  }

]

const router = new vueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
