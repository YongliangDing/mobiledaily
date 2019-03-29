import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/Recommend.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Recommend
    },
    {
      path: '/theme/:id',
      name: 'ThemeDaily',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/ThemeDaily.vue'),
      props: true
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('./views/Article.vue'),
      props: true
    }
  ]
})