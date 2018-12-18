import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './action'
Vue.use(Vuex)
const state = {
  userId: sessionStorage.getItem('userId') || '未登录',
  userName: sessionStorage.getItem('userName') || '登录'
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
