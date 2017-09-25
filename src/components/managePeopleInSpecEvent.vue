<template>
  <div class="pa-0">


    <v-btn
    dark
     fab
     right
     bottom
     fixed
     slot="activator"
     @click="goToGenExcelSheetOfUsers"
      class="create-button"
     ><v-icon class="white--text excel_icon">fa-file-excel-o</v-icon></v-btn>


  


    <v-layout row wrap justify-center class="pa-0">
   <v-flex  md5 lg8 class="pa-0">

       <v-list three-line class="grey lighten-4 pa-0">
         <template v-for="user in userRegInEvent">

           <v-list-tile  class="pa-0" @click="goToSpecUserMemDetail(user)">

             <v-list-tile-content>
               <v-list-tile-title v-html="user.name"></v-list-tile-title>
               <v-list-tile-sub-title v-html="user.uid" ></v-list-tile-sub-title>
             </v-list-tile-content>
           </v-list-tile>
           <v-divider></v-divider>
         </template>
       </v-list>

   </v-flex>
 </v-layout>
 <infinite-loading
   v-if="userRegInEvent.length >= 3 && showLoader == true"
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
        this.$store.state.db.db.ref('peopleInEvent/' + this.$route.params.id).limitToLast(3)
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

        if(this.$store.state.regUsers.userRegInEvent.length == 0){
          this.$store.state.regUsers.userRegInEvent = tempRegUsersArr
        }else{
          for(let i in tempRegUsersArr){

            if(tempRegUsersArr[i].key ==
              this.$store.state.regUsers.userRegInEvent[this.$store.state.regUsers.userRegInEventCount].key){
              //do nothing
            }else{
              this.$store.state.regUsers.userRegInEvent.push(tempRegUsersArr[i])
            }
          }
        }

        //console.log(fetchedRegUsers)
      },

      loadMore(){
        //console.log("loadMore")
        let vm = this

        this.$store.state.regUsers.userRegInEventCount += 2
        //console.log(this.$store.state.events.count)

        if(vm.$store.state.regUsers.userRegInEvent[this.$store.state.regUsers.userRegInEventCount]
          != undefined ){

          this.$store.state.db.db.ref('peopleInEvent/' + this.$route.params.id)
            .orderByKey()
            .endAt(vm.$store.state.regUsers.userRegInEvent[this.$store.state.regUsers.userRegInEventCount].key)
            .limitToLast(3)
            .once('value',function(snapshot){
              //console.log(snapshot.val())

              //
              vm.showRegUsersOnDom(snapshot.val())
                vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')

            })
        }else{
          // nothing to load more
          this.$store.state.events.showLoader = false

        }
      },
      onInfinite() {
         this.loadMore()
     },

      goToGenExcelSheetOfUsers(){
        this.$router.push('/excelSheetSpecEvent/' + this.$route.params.id)
      }

    },

    beforeMount(){

      if(this.$store.state.regUsers.userRegInEvent.length == 0){
        this.getRegUsers()
      }else{
        //console.log("else") dont load again
      }

    },

    //updated
    updated(){
      let vm = this
      this.$store.state.db.db.ref('peopleInEvent/' + this.$route.params.id)
        .limitToLast(1)
        .on('value',function(snapshot){

          if(snapshot.val() != null) {
            if(vm.$store.state.regUsers.userRegInEvent.length != 0) {
              //console.log(Object.keys(snapshot.val())[0])
              //console.log(vm.$store.state.events.eventsArr[0].key)
              if (Object.keys(snapshot.val())[0] == vm.$store.state.regUsers.userRegInEvent[0].key) {
                //console.log("eq")
                //do nothing
              } else {
                //console.log("not eq")
                let newEvent = snapshot.val()
                newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
                vm.$store.state.regUsers.userRegInEvent.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
                vm.$store.state.regUsers.userRegInEventCount += 1
                //toast
              }
            }else{
              //console.log("not eq")
              let newEvent = snapshot.val()
              newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
              vm.$store.state.regUsers.userRegInEvent.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
              vm.$store.state.regUsers.userRegInEventCount += 1
              //toast
            }
          }
        })
    },


    computed:{
      ...mapGetters([
        'userRegInEvent','showLoader'
      ])
    },

  }
</script>
<style>
.excel_icon{
    margin-left: 2px;
    margin-bottom: 2px;
}
</style>
