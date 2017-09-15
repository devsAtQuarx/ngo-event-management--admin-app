const state = {
  eventsArr : [],
  count : 0,
  newEventAdded : false,
  eventDeleted : false
}

const getters = {
  eventsArr : state => {
    return state.eventsArr
  },
  count : state => {
    return state.count
  },
  newEventAdded : state => {
    return state.newEventAdded
  }
}

export default {
  state,
  getters
}
