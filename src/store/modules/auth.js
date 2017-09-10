const state = {
  user : {},
  isLoggedIn : false
}

const getters = {
  user : state => {
    return state.user
  },
  isLoggedIn : state => {
    return state.isLoggedIn
  }
}

export default {
  state,
  getters
}
