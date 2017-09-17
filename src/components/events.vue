<template>
  <div>

    <v-btn fab dark class="teal fixed-floating-button" @click="goToCreateEvent">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-layout row wrap justify-space-around >
    <v-flex xs12 md10 lg10 v-for="(event,i) in eventsArr" class="primary ma-1 elevation-2">
         <v-card class="blue-grey darken-4 white--text" @click="goToSpecEvent(event, i)">
           <v-container fluid grid-list-lg>
             <v-layout row>
               <v-flex xs7>
                 <div>
                   <div class="headline">{{event.title}}</div>
                   <v-icon class="white--text icon_font">location_on</v-icon>
                   <span>{{event.venue}}</span>


                 </div>
                 <br>

                 <div >
                   <v-icon class="white--text icon_font" >date_range</v-icon>
                   <span>{{event.date}}</span>
                   <v-spacer></v-spacer>
                   <v-icon class="white--text icon_font">access_time</v-icon>
                   <span>{{event.time}}</span>

                 </div>

               </v-flex>
               <v-flex xs5>
                  <v-card-media
                     src="/static/img/icons/umangFoundation.jpg"
                     height="125px"
                     contain
                     v-if="event.photoUrl ==null"
                   ></v-card-media>

                   <v-card-media
                      :src="event.photoUrl[0]"
                      height="125px"
                      contain
                      v-else
                    ></v-card-media>
                   <!--button >View | Delete</button>
                   <v-btn @click="goToTrackEvent(event,i)">track event</v-btn-->
               </v-flex>
             </v-layout>
           </v-container>

         </v-card>

        <v-btn @click="goToFeedback(event,i)">feedback</v-btn>
        <v-btn @click="goToQrCode(event,i)">QR code</v-btn>

       </v-flex>
     </v-layout >


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

    goToQrCode(event,i){
      this.$router.push('/qrcode/'+event.key)
    },

    //goToFeedback
    goToFeedback(event, i){
      this.$router.push('/feedback/'+event.key)
    },

    //goToTrackEvent
    goToTrackEvent(event, i){
      this.$router.push('/trackEvent/'+event.key)
    },

    //goToSpecEvent
    goToSpecEvent(event, i){
      this.$router.push('/specEvent/'+event.key)
    },

    //goToCreateEvent
    goToCreateEvent(){
      this.$router.push('/success/createEvent')
    },

    //showEvents
    getEvents(){
        let vm = this
        this.$store.state.db.db.ref('events/').limitToLast(3)
        .once('value',function(snapshot){

          vm.showEventsOnDom(snapshot.val())
        })
    },

    //showEventsOnDom
    showEventsOnDom(fetchedEvents){
      let tempEventArr = []

      for(let i in fetchedEvents){
        fetchedEvents[i].key = i
        tempEventArr.push(fetchedEvents[i])
      }
      tempEventArr.reverse()

      if(this.$store.state.events.eventsArr.length == 0){
        this.$store.state.events.eventsArr = tempEventArr
      }else{
        for(let i in tempEventArr){

          if(tempEventArr[i].key ==
            this.$store.state.events.eventsArr[this.$store.state.events.count].key){
            //do nothing
          }else{
            this.$store.state.events.eventsArr.push(tempEventArr[i])
          }
        }
      }

      //console.log(fetchedEvents)
    },

    //reverseGotData
    reverseGotData(){

    },

    //loadMore
    loadMoreEvents(){
      //console.log("loadMore")
      let vm = this

      this.$store.state.events.count += 2
      //console.log(this.$store.state.events.count)

      if(vm.$store.state.events.eventsArr[this.$store.state.events.count]
          != undefined ){

        this.$store.state.db.db.ref('events/')
        .orderByKey()
        .endAt(vm.$store.state.events.eventsArr[this.$store.state.events.count].key)
        .limitToLast(3)
        .once('value',function(snapshot){
          //console.log(snapshot.val())

          //
          vm.showEventsOnDom(snapshot.val())

        })
      }else{
        // nothing to load more
      }
    }

  },

  //mounted
  beforeMount(){

    if(this.$store.state.events.eventsArr.length == 0){
      this.getEvents()
    }else{
      console.log("else")
      console.log(this.$store.state.events.newEventAdded)
    }

    if(this.$store.state.events.newEventAdded == true){

      let vm = this

      this.$store.state.db.db.ref('events/').limitToLast(1)
      .once('value',function(snapshot){
        let newEvent = snapshot.val()
        newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]

        vm.$store.state.events.eventsArr.splice(0,0,newEvent[Object.keys(snapshot.val())[0]])
        console.log(vm.$store.state.events.eventsArr)

        vm.$store.state.events.count += 1

        vm.$store.state.events.newEventAdded = false
      })
    }

    if(this.$store.state.events.eventDeleted == true){
      this.$store.state.events.count -= 1
      this.$store.state.events.eventDeleted == false
    }

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
  z-index: 2;
}
.icon_font{
  font-size:19px
}
</style>
