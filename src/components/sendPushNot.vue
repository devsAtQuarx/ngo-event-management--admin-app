<template>
  <div>
    send push notification<br>
    title: <input v-model="notDet.title"><br>
    content: <input v-model="notDet.content"><br>
    on click link: <input v-model="notDet.link"><br>
    <button @click="sendToAll">sendToALl</button>

    <li v-for="e in pushNotEve" @click="sendToPeopleInEvent(e.eventKey)">{{e.eventTitle}}</li>

    <button @click="loadMore()">load more</button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {

    data(){
      return {
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
                })
            })
        }else{
          //toast
          //cannot be empty
          window.alert('no') //toast
        }

      },

      sendToPeopleInEvent(e){
        let vm = this
        console.log(e)


          if(vm.notDet.title != '' && vm.notDet.content != '' && vm.notDet.link != ''){

            vm.notDet.rdmNum = Math.random()

            vm.$store.state.db.db.ref('eventToken/'+ e + '/' + 'tokDet').set(vm.notDet)
              .then(function(snapshot) {

                vm.$store.state.db.db.ref('eventToken/'+ e + '/').once('value',function(snap){
                  console.log(snap.val())

                vm.$store.state.db.db.ref('nots/').set(snap.val())
                })

              })
          }else{
            //toast
            //cannot be empty
            window.alert('no') //toast
          }



      },

      loadMore(){
        //console.log("loadMore")
        let vm = this

        this.$store.state.events.pushNotEveCnt += 2
        //console.log(this.$store.state.events.count)

        if(vm.$store.state.events.pushNotEve[this.$store.state.events.pushNotEveCnt]
          != undefined ){

          this.$store.state.db.db.ref('events/')
            .orderByKey()
            .endAt(vm.$store.state.events.pushNotEve[this.$store.state.events.pushNotEveCnt].eventKey)
            .limitToLast(3)
            .once('value',function(snapshot){
              //console.log(snapshot.val())

              //
              vm.showOnDom(snapshot.val())
              //vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')

            })
        }else{
          // nothing to load more
          //this.$store.state.events.showLoader = false

        }
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
        this.$store.state.db.db.ref('events/').limitToLast(3)
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
        'pushNotEve'
      ])
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
