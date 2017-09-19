<template>
  <div>
   <v-layout row wrap justify-space-around>
    <v-flex xs12 md10 lg10>
      <div v-for="feedback in feedbacks" class="pt-2 pb-2">
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
      feedbacks : [],
      feedbackCount : 0
    }
  },

  //methods
  methods:{

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
      }
      //console.log(tempFeedbackArr)
      tempFeedbackArr.reverse()
      //console.log(tempFeedbackArr)
      if(this.feedbacks.length == 0){
        this.feedbacks = tempFeedbackArr
      }else{
        for(let i in tempFeedbackArr){
          //console.log(tempFeedbackArr[i].uid + " " + this.feedbacks[this.feedbackCount].uid)
          if(tempFeedbackArr[i].key ==
            this.feedbacks[this.feedbackCount].key){
            //do nothing
          }else{
            this.feedbacks.push(tempFeedbackArr[i])
          }
        }
      }
      //console.log(fetchedEvents)*/
    },

    loadMoreFeedbacks(){
      //console.log("loadMore")
      //console.log("loadMore")
      let vm = this
      this.feedbackCount += 2
      //console.log(this.feedbackCount)
      //console.log(vm.feedbacks)
      //console.log(vm.feedbacks[this.feedbackCount])
      if(vm.feedbacks[this.feedbackCount]
          != undefined ){
        this.$store.state.db.db.ref('feedbackAdmin/' + this.$route.params.id)
        .orderByKey()
        .endAt(vm.feedbacks[this.feedbackCount].key)
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
      'showLoader'
    ])
  },
  components:{
    InfiniteLoading
  },

  //beforeMount
  beforeMount(){
    this.getFeedback()
  }

}
</script>
<style>
  .feedback_uid{
    font-size: 12px;
    font-weight: bold;
  }
</style>
