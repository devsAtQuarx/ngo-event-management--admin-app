const state = {
  eventsArr : []
}

const getters = {
  eventsArr : state => {
    return state.eventsArr
  }
}

export default {
  state,
  getters
}
