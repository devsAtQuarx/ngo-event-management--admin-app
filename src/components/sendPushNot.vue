<template>
  <div>
    <div class="textFields">
    <p class="grey--text text-xs-center" style="font-size:24px;font-weight:600">
      send push notification
    </p>

    <v-text-field
            v-if="this.snackbar==false"
            v-model="notDet.title"
            label="Title"
    ></v-text-field>

    <v-text-field
            v-if="this.snackbar==false"
            v-model="notDet.content"
            label="Content"
    ></v-text-field>
    <v-text-field
            v-if="this.snackbar==false"
            v-model="notDet.link"
            label="On Click Link"
    ></v-text-field>
</div>
<v-layout row wrap justify-space-around class="text-xs-center selectEventButton">
  <v-flex xs6 md4 lg4>
    <v-btn
    outline
    flat
    grey--text
    v-if="this.snackbar==false"

     @click="sendToAll"

   >Sent to all</v-btn>
   <br>
<div v-if="this.snackbar==false">
   <div v-for="e in this.pushNotEve" >
     <v-btn
      outline
      flat


      @click="sendToPeopleInEvent(e.eventKey)"

    >{{e.eventTitle}}</v-btn>
   </div>
</div>
</v-flex>
</v-layout>
   <v-snackbar
   :timeout="timeout"
   :top="y === 'top'"
   :bottom="y === 'bottom'"
   :right="x === 'right'"
   :left="x === 'left'"
   :multi-line="mode === 'multi-line'"
   :vertical="mode === 'vertical'"
   v-model="snackbar"
 >
   {{ text }}
   <v-btn flat class="white--text" @click.native="snackbar = false">Close</v-btn>
 </v-snackbar>

     <infinite-loading
       v-if="pushNotEve.length >= 3 && showLoader == true"
       :on-infinite="onInfinite"
       ref="infiniteLoading"
       class = "infiniteLoading"
     >
     </infinite-loading>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

  export default {

    data(){
      return {
        snackbar: false,
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 5000,
      text: '',
        checkbox: false,
        notDet : {
          title : '',
          content : '',
          link : '',
          //imgUrl : '',
          rdmNum : ''
        },

        //showEvents: []
      }
    },

    //methods
    methods:{

      sendToAll(){
        let vm = this
        vm.snackbar=true

        if(vm.notDet.title != '' && vm.notDet.content != '' && vm.notDet.link != ''){

          vm.notDet.rdmNum = Math.random()

          vm.$store.state.db.db.ref('tokens/tokDet/').set(vm.notDet)
            .then(function(snap) {
              //query all tokens
              vm.$store.state.db.db.ref('tokens/')
                .once('value', function (snapshot) {
                  //console.log(snapshot.val())
                  let tokens = snapshot.val()

                  //
                  vm.$store.state.db.db.ref('nots/').set(tokens)


                  vm.text="Push Notification sent"
                  vm.loaded2()
                })
            })
        }else{
          //toast
          //cannot be empty
          vm.text="Please Fill All the Fields" //toast
          vm.loaded2()
        }

      },

      sendToPeopleInEvent(e){
        let vm = this
        vm.snackbar=true
        console.log(e)


          if(vm.notDet.title != '' && vm.notDet.content != '' && vm.notDet.link != ''){

            vm.notDet.rdmNum = Math.random()

            vm.$store.state.db.db.ref('eventToken/'+ e + '/' + 'tokDet').set(vm.notDet)
              .then(function(snapshot) {

                vm.$store.state.db.db.ref('eventToken/'+ e + '/').once('value',function(snap){
                  console.log(snap.val())

                vm.$store.state.db.db.ref('nots/').set(snap.val())

                })
                  vm.text="Push Notification sent"
                  vm.loaded2()
              })
          }else{
            //toast
            //cannot be empty
            vm.text="Please Fill All the Fields"//toast
            vm.loaded2()
          }



      },
      loaded2 () {
        setTimeout(() => (this.snackbar = false), 3000)
      },

      loadMore(){
        //console.log("loadMore")
        let vm = this

        this.$store.state.events.pushNotEveCnt += 9
        //console.log(this.$store.state.events.count)

        if(vm.$store.state.events.pushNotEve[this.$store.state.events.pushNotEveCnt]
          != undefined ){

          this.$store.state.db.db.ref('events/')
            .orderByKey()
            .endAt(vm.$store.state.events.pushNotEve[this.$store.state.events.pushNotEveCnt].eventKey)
            .limitToLast(10)
            .once('value',function(snapshot){
              //console.log(snapshot.val())

              //
              vm.showOnDom(snapshot.val())
              vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
              //vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')

            })
        }else{
          // nothing to load more
          this.$store.state.events.showLoader = false

        }
      },
      onInfinite() {
        this.loadMore()
    },
      showOnDom(fetchedEvents){

        let tempRegEventsArr = []
        for(let i in fetchedEvents){
          //console.log(eventSnap.val())
          let tmpObj = {
            eventKey:i,
            eventTitle : fetchedEvents[i].title
          }
          tempRegEventsArr.push(tmpObj)
        }
        tempRegEventsArr.reverse()

        if(this.$store.state.events.pushNotEve.length == 0){
          this.$store.state.events.pushNotEve = tempRegEventsArr
        }else{
          for(let i in tempRegEventsArr){

            if(tempRegEventsArr[i].eventKey ==
              this.$store.state.events.pushNotEve[this.$store.state.events.pushNotEveCnt].eventKey){
              //do nothing
            }else{
              this.$store.state.events.pushNotEve.push(tempRegEventsArr[i])
            }
          }
        }

      },

      getEvents(){
        let vm = this
        this.$store.state.db.db.ref('events/').limitToLast(10)
          .once('value',function(eventSnap){
          vm.showOnDom(eventSnap.val())
        })
      }

    },

    beforeMount(){
      //events
      let vm = this

      if(this.$store.state.events.pushNotEve.length == 0){
        this.getEvents()
      }else{
        //console.log("else") dont load again
      }
    },

    computed:{
      ...mapGetters([
        'pushNotEve','showLoader'
      ])
    },
    components:{
     InfiniteLoading
   },

    //updated
    updated(){
      let vm = this
      this.$store.state.db.db.ref('events/')
        .limitToLast(1)
        .on('value',function(snapshot){
          let newEvent = snapshot.val()
          ///console.log(newEvent[Object.keys(snapshot.val())[0]])
          if(snapshot.val() != null) {
            if(vm.$store.state.events.pushNotEve.length != 0) {
              //console.log(Object.keys(snapshot.val())[0])
              //console.log(vm.$store.state.events.eventsArr[0].key)
              if (Object.keys(snapshot.val())[0] == vm.$store.state.events.pushNotEve[0].eventKey) {
                //console.log("eq")
                //do nothing
              } else {
                //console.log("not eq")

                //console.log('upd',newEvent)
                let tmpObj = {
                  eventKey: Object.keys(snapshot.val())[0],
                  eventTitle : newEvent[Object.keys(snapshot.val())[0]].title
                }

                vm.$store.state.events.pushNotEve.splice(0, 0, tmpObj)
                vm.$store.state.events.pushNotEveCnt += 1
                //toast
              }
            }else{
              //console.log("not eq")
              let newEvent = snapshot.val()
              newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]


              let tmpObj = {
                eventKey: Object.keys(snapshot.val())[0],
                eventTitle : newEvent[Object.keys(snapshot.val())[0]].title
              }

              vm.$store.state.events.pushNotEve.splice(0, 0, tmpObj)
              vm.$store.state.events.pushNotEveCnt += 1
              //toast
            }
          }
        })
    },

  }
</script>
<style>
.textFields
{position: fixed;
width: 100%;
z-index: 2;
background: #f5f5f5;}
.selectEventButton{
  padding-top: 40vh;
  z-index: 1;
}
</style>
