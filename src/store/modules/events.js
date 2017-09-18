const state = {
  eventsArr : [],
  count : 0,
  newEventAdded : false,
  eventDeleted : false,
  showLoader:true
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
  },
  showLoader : state => {
    return state.showLoader
  }
}

export default {
  state,
  getters
}
