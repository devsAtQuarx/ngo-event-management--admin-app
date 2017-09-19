<template>
  <div>
    excelSheetSpecEvent {{$route.params.id}}

    <span v-if="downFinish == false">
      preparing data to be downloaded ... Please Wait ...
    </span>
    <download-excel
      v-else
      class   = "btn btn-default"
      :data   = "json_data"
      :fields = "json_fields"
      name    = "filename.xls">
      Download Excel (you can customize this with html code!)
    </download-excel>

   

  </div>
</template>
<script>
  import JsonExcel from 'vue-json-excel'

  export default {

    data(){
      return{
        downFinish : false ,
        json_fields : {

          //auth
          "uid"      : "String",
          "name"      : "String",
          "email"   : "String",
          "photoUrl" : "String",

          //mem
          "membershipStatus" : "String",
          "membershipNo" : "String",

          "fullName" : "String" ,
          "phNo" : "String",
          "email" : "String",
          "address" : "String",
          "suburb" : "String",
          "city" : "String",

          "altPhNo" : "String",
          "altEmail" : "String",

          "bloodGroup" : "String",
          "dob" : "String",
          "gender" : "String",
          "orgName" : "String",

          "profession" : "String",
          "profileDesc" : "String",
          "areaOfInterest" : "String",
          "association" : "String",
          "experience" : "String",
          "referalDetails" : "String" ,

          "selectContactOptionEmail" : "String",
          "selectContactOptionOther" : "String",
          "selectContactOptionPhNo" : "String",
          "selectContactOptionPushNot" : "String",
          "selectContactOptionSms" : "String",


          "volOptsOther" : "String",
          "volOptsEvent" : "String",
          "volOptsFund" : "String",
          "volOptsnetRes" : "String",
          "volOptsSkill" : "String"
        },
        json_data : []
      }
    },

    components:{
      'downloadExcel':JsonExcel
    },

    beforeMount(){
      this.downFinish  = false
      //start preloader - preparing data to be downloaded
      let vm = this
      this.$store.state.db.db.ref('peopleInEvent/' + this.$route.params.id)
        .once('value',function (snapshot) {
          //console.log(snapshot.val())
          let userAuthDetail = snapshot.val()
          //console.log(Object.keys(userAuthDetail))
          for(let i in Object.keys(userAuthDetail)){
            //console.log(userAuthDetail[i])
            //console.log(Object.keys(userAuthDetail)[i])
            //console.log(userAuthDetail[Object.keys(userAuthDetail)[i]])

            //get membership details
            vm.$store.state.db.db.ref('membershipDetail/' + Object.keys(userAuthDetail)[i])
              .once('value',function (snapshot2) {

                let userMemDetail = snapshot2.val()
                let membershipStatus
                let tmpObj

                if(userMemDetail == null) {
                  membershipStatus = 'not a member'

                  //pack
                  tmpObj = {
                    //auth
                    uid: Object.keys(userAuthDetail)[i],
                    name: userAuthDetail[Object.keys(userAuthDetail)[i]],
                    //email: userAuthDetail[i].email,
                    //photoUrl: userAuthDetail[i].photoUrl,

                    //mem
                    membershipStatus
                  }
                }
                else {
                  membershipStatus = 'member'

                  //pack
                  tmpObj = {
                    //auth
                    uid : Object.keys(userAuthDetail)[i],
                    name : userAuthDetail[Object.keys(userAuthDetail)[i]],
                    //email : userAuthDetail[i].email,
                    //photoUrl : userAuthDetail[i].photoUrl,

                    //mem
                    membershipStatus,
                    membershipNo : userMemDetail.membershipNo,

                    fullName : userMemDetail.fullName ,
                    phNo : userMemDetail.phNo,
                    email : userMemDetail.email,
                    address : userMemDetail.address,
                    suburb : userMemDetail.suburb,
                    city : userMemDetail.city,

                    altPhNo : userMemDetail.alternativePhNo,
                    altEmail : userMemDetail.alternativeEmail,

                    bloodGroup : userMemDetail.bloodGroup,
                    dob : userMemDetail.dob,
                    gender : userMemDetail.gender.text,
                    orgName : userMemDetail.orgName,

                    profession : userMemDetail.profession.text,
                    profileDesc : userMemDetail.profileDesc,
                    areaOfInterest : userMemDetail.areaOfInterest,
                    association : userMemDetail.association,
                    experience : userMemDetail.experience,
                    referalDetails : userMemDetail.referalDetails ,

                    selectContactOptionEmail : userMemDetail.selectContactOption.email,
                    selectContactOptionOther : userMemDetail.selectContactOption.other,
                    selectContactOptionPhNo : userMemDetail.selectContactOption.ph,
                    selectContactOptionPushNot : userMemDetail.selectContactOption.pushNot,
                    selectContactOptionSms : userMemDetail.selectContactOption.sms,

                    volOptsOther : userMemDetail.volOpts.otherTxt,
                    volOptsEvent : userMemDetail.volOpts.event,
                    volOptsFund : userMemDetail.volOpts.fund,
                    volOptsnetRes : userMemDetail.volOpts.netRes,
                    volOptsSkill : userMemDetail.volOpts.skill
                  }
                }
                vm.json_data.push(tmpObj)
              })
          }
          //stop preloader
          vm.downFinish  = true
        })
    }

  }
</script>
