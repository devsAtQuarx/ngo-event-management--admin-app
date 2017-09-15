<template>
  <div>

    <v-btn fab dark class="teal fixed-floating-button" @click="goToCreateEvent">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-layout row wrap justify-space-around >
    <v-flex xs12 md10 lg10 v-for="(event,i) in eventsArr" class="primary ma-3">
         <v-card class="white grey--text">
           <v-container fluid grid-list-lg>
             <v-layout row>
               <v-flex xs7>
                 <div>
                   <div class="headline">{{event.title}}</div>
                   <div>Ellie Goulding</div>
                 </div>
               </v-flex>
               <v-flex xs5>
                  <v-card-media
                     src="/static/img/icons/apple-touch-icon.png"
                     height="125px"
                     contain
                   ></v-card-media>
               </v-flex>
             </v-layout>
           </v-container>
         </v-card>

       </v-flex>
     </v-layout >
    <!--li v-for="(event,i) in eventsArr">
      {{i}} - {{event}}
    </li-->

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
