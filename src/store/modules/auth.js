const state = {
  user : {},
  isLoggedIn : false,
  drawer:true
}

const getters = {
  user : state => {
    return state.user
  },
  isLoggedIn : state => {
    return state.isLoggedIn
  },
  drawer : state => {
    return state.drawer
  }
}

export default {
  state,
  getters
}
