const mutations = {
  setUserId: (state, value) => {
    state.userId = value
    window.sessionStorage.setItem('userId', state.userId)
  },
  setUserName: (state, value) => {
    state.userName = value
    window.sessionStorage.setItem('userName', state.userName)
  }
}
export default mutations
