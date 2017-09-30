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
         <template v-for="user in regUsers" >

           <v-list-tile avatar class="pa-0" @click="goToSpecUserMemDetail(user)">
             <v-list-tile-avatar>
               <img v-bind:src="user.photoUrl">
             </v-list-tile-avatar>
             <v-list-tile-content>
               <v-list-tile-title v-html="user.name"></v-list-tile-title>
               <v-list-tile-sub-title v-html="user.email" ></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="user.uid" ></v-list-tile-sub-title>
             </v-list-tile-content>
           </v-list-tile>
           <v-divider></v-divider>
         </template>
       </v-list>

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
   v-if="regUsers.length >= 3 && showLoader == true"
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
        snackbar: false,
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 3000,
      text: ''
      }
    },

    methods:{

      goToSpecUserMemDetail(user){
        let vm = this
        this.snackbar=true
        this.$store.state.db.db.ref('membershipDetail/' + user.uid)
          .once('value',function(memStatusSnap){
            if(memStatusSnap.val() == null ){
            //  window.alert('not a mem')
              vm.text="The selected User is NOT a member"
              this.loaded2()
            }else{
              vm.$router.push('/specUserMemDetail/' + user.uid)
            }
          })
      },

      loaded2 () {
        setTimeout(() => (this.snackbar = false), 3000)
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
        this.$router.push('/genExcelSheetOfUsers')
      }

    },
    components:{
      InfiniteLoading
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
            if(vm.$store.state.regUsers.regUsers.length != 0) {
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
            }else{
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
        'regUsers','showLoader'
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
