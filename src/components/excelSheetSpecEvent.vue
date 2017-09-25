<template>
  
    <div>
      <p class="grey--text text-xs-center download_text" v-show="downFinish != false">
        Click below to generate Excel Sheet
      </p>

      <v-layout row wrap justify-space-around>
          <download-excel
          v-show="downFinish != false"
            class   = "btn btn-default"
            :data   = "json_data"
            :fields = "json_fields"
            name    = "filename.xls">

            <v-icon class="grey--text download " style="font-size:200px">
              cloud_download
            </v-icon>

          </download-excel>
      </v-layout>
      <div class="preload" v-show="downFinish == false"></div>

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
      this.$store.state.db.db.ref('checkPeopleInEvent/' + this.$route.params.id)
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

                //console.log(snapshot.val())

                let userMemDetail = snapshot2.val()
                let membershipStatus
                let tmpObj

                if(userMemDetail == null) {
                  membershipStatus = 'not a member'

                  //pack
                  tmpObj = {
                    //auth
                    uid: Object.keys(userAuthDetail)[i],
                    name: userAuthDetail[Object.keys(userAuthDetail)[i]].name,
                    //email: userAuthDetail[Object.keys(userAuthDetail)[i]].email,
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
                    name : userAuthDetail[Object.keys(userAuthDetail)[i]].name,
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
<style>
.download_text{
  font-weight: bolder;
  font-size: 24px;
}
.download{

    position: fixed;
    top: 45%;
    height: 30px;
    margin: -42px 0 0 -12px;

}
.preload {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  margin: -42px 0 0 -12px;
  background: #1976d2;
  transform: rotate(45deg);
  animation: spin 1s infinite linear;
  z-index: 7000;
}
@keyframes spin {
	0% { -webkit-transform:rotate(0deg); }
	100% { -webkit-transform:rotate(360deg); }
}
</style>
