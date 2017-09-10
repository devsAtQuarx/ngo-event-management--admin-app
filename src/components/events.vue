<template>
  <div>

    <v-btn fab dark class="teal fixed-floating-button" @click="goToCreateEvent">
      <v-icon dark>add</v-icon>
    </v-btn>

    <li v-for="(event,i) in eventsArr">
      {{i}} - {{event}}
    </li>

    <button @click="loadMoreEvents()">
      load more events ...
    </button>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  //methods
  methods:{

    //goToCreateEvent
    goToCreateEvent(){
      this.$router.push('/success/createEvent')
    },

    //showEvents
    showEvents(){
        let vm = this
        this.$store.state.db.db.ref('events/').limitToLast(3)
        .once('value',function(snapshot){
          //console.log(Object.keys(snapshot.val()))
          vm.$store.state.events.eventsArr = snapshot.val()
          //console.log(vm.$store.state.events.eventsArr)
        })
    },

    //loadMore
    loadMoreEvents(){
      //console.log("loadMore")
      this.$store.state.db.db.ref('events/').limitToLast(3)
      .once('value',function(snapshot){
        console.log(snapshot.val())
        vm.$store.state.events.eventsArr = snapshot.val()
      })
    }

  },

  //mounted
  beforeMount(){
    this.showEvents()
  },

  computed:{
    ...mapGetters([
      'eventsArr'
    ])
  },
}
</script>

<style scoped>
.fixed-floating-button{
  position:fixed;
  right: 20px;
  bottom :20px;
}
</style>
