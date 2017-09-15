<template>
  <div>
    {{$route.params.id}}
    <span>{{specEventFromDb}}</span>
    <v-btn @click="delEvent(specEventFromDb)">Delete Event</v-btn>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  data(){
    return {
      specEventFromDb: {}
    }
  },

  //methods
  methods:{

    getSpecEvent(){
      let vm = this

      this.$store.state.db.db.ref('events/' + this.$route.params.id)
      .once('value',function(snapshot){
        //console.log(snapshot.val())
        vm.specEventFromDb = snapshot.val()
      })
    },

    delEvent(specEventFromDb){
      let vm = this

      //console.log(key)
      this.$store.state.db.db.ref('events/' + this.$route.params.id).remove()
      .then(function(){

          //vm.$store.state.events.eventsArr.splice(specEvent.index,1)
          //
          for(let i in vm.$store.state.events.eventsArr){
            if(vm.$store.state.events.eventsArr[i].key == vm.$route.params.id){
              vm.$store.state.events.eventsArr.splice(i,1)
              //console.log("del")
              break
            }
          }
          //
          vm.$store.state.events.eventDeleted = true
          vm.$router.push('/success')
      })
    }
  },

  //computed
  computed:{
    ...mapGetters([

    ])
  },

  beforeMount(){
    this.getSpecEvent()
  }
}
</script>
