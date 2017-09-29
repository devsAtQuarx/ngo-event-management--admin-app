<template>
  <div >
    <!--cal user time !
    {{userUid}}-->
    <span v-if="detailArr.length != 0">
      <span class="memdetails_head">Total Time Spent By Users In this Event :-</span>
      <span >
        {{userTime.hr}} hours
        {{userTime.min}} minutes
      </span>
      <br>
      <span>Details: </span>
      <br>
      <span>
        <span style="margin-left: 25px;">User Uid</span>
        <span style="margin-left: 100px;">Duration</span>
      </span>
      <li v-for="i in detailArr" @click="goToSpecUser(i.key)">
        {{i.key}} - {{i.hr}}hr  {{i.min}}min
      </li>
    </span>
    <span v-else>
      <span class="memdetails_head">Total Time Spent By User In Events :-</span>
      <span >
        0 hours
        0 minutes
      </span>
    </span>
  </div>
</template>

<script>
  import moment from 'moment'

  export default{

    //props
    props:['eventKey'],

    //data
    data(){
      return {
        userTime : {
          hr : '',
          min : ''
        },
        detailArr : []
      }
    },

    //methods
    methods:{

      getUserAtt(){
        let vm = this
        this.$store.state.db.db.ref('attendanceEvents/' + vm.eventKey )
          .once('value',function(snap){
            //console.log(snap.val())
            vm.calTime(snap.val())
          })
      },

      calTime(events){
        //console.log(events)

        let sumHr = 0
        let sumMin = 0

        for(let i in events) {
          //console.log(events)
          //console.log(events[i].leave) //undefined
          if (events[i].leave != undefined) { //condition
            //console.log(events[i].leave + " | " + events[i].join)
            let endTime = moment(events[i].leave)
            let startTime = moment(events[i].join)
            //console.log(moment.duration(endTime.diff(startTime)).hours() + "|"
              //+ moment.duration(endTime.diff(startTime)).minutes())

            sumHr += moment.duration(endTime.diff(startTime)).hours()
            sumMin += moment.duration(endTime.diff(startTime)).minutes()

            let tmpObj = {
              key: i,
              hr: moment.duration(endTime.diff(startTime)).hours(),
              min: moment.duration(endTime.diff(startTime)).minutes()
            }

            this.detailArr.push(tmpObj)
          }//if ends

        }//for ends

        //console.log(sumHr + "|" + sumMin)
        if(sumMin > 59){
          let newSumMin = sumMin%60
          let addSumHr = parseInt(sumMin/60)
          let newSumHr = sumHr + addSumHr

          if(newSumMin < 10){
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = newSumHr
            this.userTime.min ='0' + newSumMin
          }else{
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = newSumHr
            this.userTime.min = newSumMin
          }
        }else{

          if(sumMin < 10){
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = sumHr
            this.userTime.min ='0' + sumMin
          }else{
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = sumHr
            this.userTime.min = sumMin
          }
        }
      },

      goToSpecUser(k){
        this.$router.push('/specUserMemDetail/'+ k)
      }

    },

    //beforeMount
    beforeMount(){
      this.getUserAtt()
    }

  }
</script>
