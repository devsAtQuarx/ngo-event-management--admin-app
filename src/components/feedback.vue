<template>
  <div>
   <v-layout row wrap justify-space-around>
    <v-flex xs12 md10 lg10>
      <div v-for="feedback in feedbacks" class="pt-2 pb-2" @click="goToSpecUserMemDetail(feedback.uid)">
        <div class="feedback_uid">{{feedback.uid}}</div>
        {{feedback.feedback}}
        <v-divider></v-divider>
      </div>
    </v-flex>
  </v-layout>
  <infinite-loading
    v-if="feedbacks.length >= 3 && showLoader == true"
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
export default{

  //data
  data(){
    return{
      //feedbacks : [],
      //feedbackCount : 0
    }
  },

  //methods
  methods:{

    goToSpecUserMemDetail(uid){
      this.$router.push('/specUserMemDetail/' + uid)
    },

    getFeedback(){
      //console.log("getFeedback")
      let vm = this
      this.$store.state.db.db.ref('feedbackAdmin/' + this.$route.params.id).limitToLast(3)
      .once('value',function(snapshot){
        //console.log(snapshot.val())
        vm.showFeedbacksOnDom(snapshot.val())
      })
    },

    //showEventsOnDom
    showFeedbacksOnDom(fetchedFeedbacks){
      //console.log(fetchedFeedbacks)
      let tempFeedbackArr = []
      for(let i in fetchedFeedbacks){
        fetchedFeedbacks[i].key = i
        tempFeedbackArr.push(fetchedFeedbacks[i])
        console.log("1")
      }
      //console.log(tempFeedbackArr)
      tempFeedbackArr.reverse()
      //console.log(tempFeedbackArr)
      if(this.$store.state.events.feedbacks.length == 0){
        this.$store.state.events.feedbacks = tempFeedbackArr
        console.log("2")
      }else{
        console.log("3")
        for(let i in tempFeedbackArr){
          //console.log(tempFeedbackArr[i].uid + " " + this.$store.state.events.feedbacks[this.$store.state.events.feedbackCount].uid)
          if(tempFeedbackArr[i].key ==
            this.$store.state.events.feedbacks[this.$store.state.events.feedbackCount].key){
            //do nothing
          }else{
            this.$store.state.events.feedbacks.push(tempFeedbackArr[i])
          }
        }
      }
      //console.log(fetchedEvents)*/
    },

    loadMoreFeedbacks(){
      //console.log("loadMore")
      //console.log("loadMore")
      let vm = this
      this.$store.state.events.feedbackCount += 2
      //console.log(this.$store.state.events.feedbackCount)
      //console.log(vm.$store.state.events.feedbacks)
      //console.log(vm.$store.state.events.feedbacks[this.$store.state.events.feedbackCount])
      if(vm.$store.state.events.feedbacks[this.$store.state.events.feedbackCount]
          != undefined ){
        this.$store.state.db.db.ref('feedbackAdmin/' + this.$route.params.id)
        .orderByKey()
        .endAt(vm.$store.state.events.feedbacks[this.$store.state.events.feedbackCount].key)
        .limitToLast(3)
        .once('value',function(snapshot){
          //console.log(snapshot.val())
          //
          vm.showFeedbacksOnDom(snapshot.val())
          vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
      }else{
        // nothing to load more
        this.$store.state.events.showLoader = false
      }
    },
    onInfinite() {
       this.loadMoreFeedbacks()
   },
  },

  computed:{
    ...mapGetters([
      'showLoader','feedbacks'
    ])
  },
  components:{
    InfiniteLoading
  },

  //beforeMount
  beforeMount(){
    if(this.$store.state.events.feedbacks.length == 0){
      this.getFeedback()
    }else{
      //console.log("else") dont load again
    }
  },

  //updated
  updated(){
    let vm = this
    this.$store.state.db.db.ref('feedbackAdmin/' + this.$route.params.id)
      .limitToLast(1)
      .on('value',function(snapshot){
        if(snapshot.val() != null) {
          //console.log(Object.keys(snapshot.val())[0])
          //console.log(vm.$store.state.events.eventsArr[0].key)
          if(vm.$store.state.events.feedbacks.length != 0) {
            if (Object.keys(snapshot.val())[0] == vm.$store.state.events.feedbacks[0].key) {
              //console.log("eq")
              //do nothing
            } else {
              //console.log("not eq")
              let newEvent = snapshot.val()
              newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
              vm.$store.state.events.feedbacks.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
              vm.$store.state.events.feedbackCount += 1
              //toast
            }
          }else{
            //console.log("not eq")
            let newEvent = snapshot.val()
            newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
            vm.$store.state.events.feedbacks.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
            vm.$store.state.events.feedbackCount += 1
            //toast
          }
        }
      })
  },

}
</script>
<style>
  .feedback_uid{
    font-size: 12px;
    font-weight: bold;
  }
</style>
