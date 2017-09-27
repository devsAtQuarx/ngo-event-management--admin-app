<template>
  <div>
    send push notification<br>
    title: <input v-model="notDet.title"><br>
    content: <input v-model="notDet.content"><br>
    on click link: <input v-model="notDet.link"><br>
    <button @click="sendToAll">sendToALl</button>

    <li v-for="e in showEvents" @click="sendToPeopleInEvent(e.eventKey)">{{e.eventTitle}}</li>
  </div>
</template>
<script>
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

        showEvents: []
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



      }

    },

    beforeMount(){
      //events
      let vm = this
      this.$store.state.db.db.ref('events/').once('value',function(eventSnap){
        for(let i in eventSnap.val()){
          //console.log(eventSnap.val())
          let tmpObj = {
            eventKey:i,
            eventTitle : eventSnap.val()[i].title
          }
          vm.showEvents.push(tmpObj)
        }
      })
    }
  }
</script>
