const state = {
  regUsers : [],
  regUserCount : 0,
  userRegInEvent : [],
  userRegInEventCount : 0
}

const getters = {
  regUsers : state => {
    return state.regUsers
  },
  regUserCount : state => {
    return state.regUserCount
  },
  userRegInEvent : state => {
    return state.userRegInEvent
  },
  userRegInEventCount : state => {
    return state.userRegInEventCount
  }
}

export default {
  state,
  getters
}
