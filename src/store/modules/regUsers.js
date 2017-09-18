const state = {
  regUsers : [],
  regUserCount : 0
}

const getters = {
  regUsers : state => {
    return state.regUsers
  },
  regUserCount : state => {
    return state.regUserCount
  }
}

export default {
  state,
  getters
}
