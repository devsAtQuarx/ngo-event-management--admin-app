const state = {
  user : {},
  isLoggedIn : false,
  db : {}
}

const getters = {
  user : state => {
    return state.user
  },
  isLoggedIn : state => {
    return state.isLoggedIn
  },
  firebaseApp : state => {
    return state.firebaseApp
  }
}

export default {
  state,
  getters
}
