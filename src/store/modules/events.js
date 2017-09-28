const state = {
  eventsArr : [],
  count : 0,
  newEventAdded : false,
  eventDeleted : false,
  showLoader:true,
  feedbacks : [],
  feedbackCount : 0,

  //
  pushNotEve : [],
  pushNotEveCnt : 0
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
  },
  feedbacks : state => {
    return state.feedbacks
  },
  feedbackCount  : state => {
    return state.feedbackCount
  },

  pushNotEve  : state => {
    return state.pushNotEve
  },
}

export default {
  state,
  getters
}
