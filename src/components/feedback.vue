<template>
  <div>
    feedback {{$route.params.id}}
    <li v-for="feedback in feedbacks">
      {{feedback}}
    </li>
    <v-btn @click="loadMoreFeedbacks">loadMore</v-btn>
  </div>
</template>
<script>
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
      console.log(tempFeedbackArr)
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
      console.log(vm.feedbacks[this.feedbackCount])
      if(vm.feedbacks[this.feedbackCount]
          != undefined ){
        this.$store.state.db.db.ref('feedbackAdmin/' + this.$route.params.id)
        .orderByKey()
        .endAt(vm.feedbacks[this.feedbackCount].key)
        .limitToLast(3)
        .once('value',function(snapshot){
          console.log(snapshot.val())
          //
          vm.showFeedbacksOnDom(snapshot.val())
        })
      }else{
        // nothing to load more
      }
    }
  },

  //computed
  computed:{

  },

  //beforeMount
  beforeMount(){
    this.getFeedback()
  }

}
</script>
