<template>
  <div>
    manage registered users

    <v-btn @click="goToGenExcelSheetOfUsers">go to gen excel sheet of users</v-btn>

    <li
      @click="goToSpecUserMemDetail(user)"
      v-for="user in regUsers"
    >
      {{user}}
    </li>

    <v-btn @click="loadMore()">load More ...</v-btn>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {

    data(){
      return{

      }
    },

    methods:{

      goToSpecUserMemDetail(user){
        this.$router.push('/specUserMemDetail/' + user.uid)
      },

      //showEvents
      getRegUsers(){
        let vm = this
        this.$store.state.db.db.ref('userAuthDetail/').limitToLast(3)
          .once('value',function(snapshot){
            //console.log(snapshot.val())
            vm.showRegUsersOnDom(snapshot.val())
          })
      },

      //showEventsOnDom
      showRegUsersOnDom(fetchedRegUsers){
        console.log(fetchedRegUsers)
        let tempRegUsersArr = []

        for(let i in fetchedRegUsers){
          fetchedRegUsers[i].key = i
          tempRegUsersArr.push(fetchedRegUsers[i])
        }
        tempRegUsersArr.reverse()

        if(this.$store.state.regUsers.regUsers.length == 0){
          this.$store.state.regUsers.regUsers = tempRegUsersArr
        }else{
          for(let i in tempRegUsersArr){

            if(tempRegUsersArr[i].key ==
              this.$store.state.regUsers.regUsers[this.$store.state.regUsers.regUserCount].key){
              //do nothing
            }else{
              this.$store.state.regUsers.regUsers.push(tempRegUsersArr[i])
            }
          }
        }

        //console.log(fetchedRegUsers)
      },

      loadMore(){
        //console.log("loadMore")
        let vm = this

        this.$store.state.regUsers.regUserCount += 2
        //console.log(this.$store.state.events.count)

        if(vm.$store.state.regUsers.regUsers[this.$store.state.regUsers.regUserCount]
          != undefined ){

          this.$store.state.db.db.ref('userAuthDetail/')
            .orderByKey()
            .endAt(vm.$store.state.regUsers.regUsers[this.$store.state.regUsers.regUserCount].key)
            .limitToLast(3)
            .once('value',function(snapshot){
              //console.log(snapshot.val())

              //
              vm.showRegUsersOnDom(snapshot.val())

            })
        }else{
          // nothing to load more

        }
      },

      goToGenExcelSheetOfUsers(){
        this.$router.push('/genExcelSheetOfUsers')
      }

    },

    beforeMount(){

      if(this.$store.state.regUsers.regUsers.length == 0){
        this.getRegUsers()
      }else{
        //console.log("else") dont load again
      }

    },

    //updated
    updated(){
      let vm = this
      this.$store.state.db.db.ref('userAuthDetail/')
        .limitToLast(1)
        .on('value',function(snapshot){
          if(snapshot.val() != null) {
            //console.log(Object.keys(snapshot.val())[0])
            //console.log(vm.$store.state.events.eventsArr[0].key)
            if (Object.keys(snapshot.val())[0] == vm.$store.state.regUsers.regUsers[0].key) {
              //console.log("eq")
              //do nothing
            } else {
              //console.log("not eq")
              let newEvent = snapshot.val()
              newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
              vm.$store.state.regUsers.regUsers.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
              vm.$store.state.regUsers.regUserCount += 1
              //toast
            }
          }
        })
    },

    computed:{
      ...mapGetters([
        'regUsers'
      ])
    },

  }
</script>
