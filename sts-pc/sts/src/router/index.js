import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/home'], resolve),
      children: [
        {
          path: '',
          name: 'index',
          component: resolve => require(['../pages/index'], resolve)
        },
        {
          path: '/bidding',
          name: 'bidding',
          component: resolve => require(['../pages/bidding'], resolve)
        },
        {
          path: '/result',
          name: 'result',
          component: resolve => require(['../pages/result'], resolve)
        },
        {
          path: '/manage',
          name: 'manage',
          component: resolve => require(['../pages/manage'], resolve)
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['../pages/order'], resolve)
        },
        {
          path: '/pack',
          name: 'pack',
          component: resolve => require(['../pages/pack'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login'], resolve)
    }
  ]
})
