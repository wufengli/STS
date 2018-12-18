// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import 'styles/common.css'
import 'styles/font.css'
import Distpicker from 'v-distpicker'
import {post, get, patch, put} from '@/api/http'
import store from './store/store'
Vue.component('v-distpicker', Distpicker)
Vue.use(ElementUI)
Vue.config.productionTip = false
// 引入mock.js
require('../static/mock/mockone.js')
// require('../static/mock/mock.js')
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

