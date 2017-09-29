<template>
  <div>

    <v-layout row wrap justify-center class="pa-0">
   <v-flex  md5 lg10 class="pa-0">

       <v-list three-line class="grey lighten-4 pa-0">
         <template>

           <v-list-tile avatar class="pa-0">
             <v-list-tile-avatar>
               <img v-bind:src="userBasicDetail.photoUrl"
               style="border-radius:50%;
                height: 60px;
                width: 60px;
                 margin-left: -7px;
                 margin-top: -13px;">
             </v-list-tile-avatar>
             <v-list-tile-content>
               <v-list-tile-title v-html="userBasicDetail.name"></v-list-tile-title>
               <v-list-tile-sub-title v-html="userBasicDetail.email" ></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="userBasicDetail.uid" ></v-list-tile-sub-title>
             </v-list-tile-content>
           </v-list-tile>
           <v-divider></v-divider>
         </template>
       </v-list>

   </v-flex>
 </v-layout>
 <v-layout row wrap justify-space-around class="pa-0 grey--text" >
      <v-flex xs12 md5 lg3>
        <div>
          <span class="memdetails_head">Email:-
          </span>

          <span class="memdetails_value">{{userMemDetail.email}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">DOB:-
          </span>

          <span class="memdetails_value">{{userMemDetail.dob}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>

        <div>
          <span class="memdetails_head">Alternate Email:-
          </span>
          <span class="memdetails_value" v-if="userMemDetail.atlernativeEmail==null" >
            Not entered by user
          </span>
          <span class="memdetails_value" >{{userMemDetail.atlernativeEmail}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Profession :-
          </span>

          <span class="memdetails_value">{{userMemDetail.profession.text}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">City :-
          </span>

          <span class="memdetails_value">{{userMemDetail.city}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Full Name :-
          </span>
          <span class="memdetails_value" v-if="userMemDetail.fullName==null" >
            Not entered by user
          </span>
          <span class="memdetails_value">{{userMemDetail.fullName}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Association :-
          </span>

          <span class="memdetails_value">{{userMemDetail.association}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Blood Group :-
          </span>

          <span class="memdetails_value">{{userMemDetail.bloodGroup}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Area of Interest :-
          </span>

          <span class="memdetails_value">{{userMemDetail.areaOfInterest}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <div>
          <span class="memdetails_head">Selected Contact Option :-
          </span>
          <span class="memdetails_value"  v-for="(value,key) in userMemDetail.selectContactOption"
          v-if="value==true">{{key}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Referal Detail :-
          </span>
          <span class="memdetails_value" v-if="userMemDetail.referalDetails==null" >
            Not entered by user
          </span>
          <span class="memdetails_value">{{userMemDetail.referalDetails}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
      </v-flex>





      <v-flex xs12 lg3 offset-lg2>
        <div>
        <span class="memdetails_head">Ph. :-
        </span>
        <span class="memdetails_value" v-if="userMemDetail.phNo==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{userMemDetail.phNo}}
        </span>
        <v-divider style="width:100%"></v-divider>

      </div>
      <br>
      <div>
        <span class="memdetails_head">Gender :-
        </span>

        <span class="memdetails_value">{{userMemDetail.gender.text}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Alternate Ph. :-
        </span>
        <span class="memdetails_value" v-if="userMemDetail.atlernativePhNo==''" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{userMemDetail.alternativePhNo}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Address :-
        </span>
        <span class="memdetails_value" v-if="userMemDetail.address==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{userMemDetail.address}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Membership No :-
        </span>
        <span class="memdetails_value">{{userMemDetail.membershipNo}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Organization :-
        </span>
        <span class="memdetails_value" v-if="userMemDetail.orgName==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{userMemDetail.orgName}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <div>
        <span class="memdetails_head">Volunteered for :-
        </span>
        <span class="memdetails_value"  v-for="(value,key) in userMemDetail.volOpts"
        v-if="value==true">{{key}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Profile Description :-
        </span>
        <span class="memdetails_value" v-if="userMemDetail.profileDesc==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{userMemDetail.profileDesc}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Suburb :-
        </span>
        <span class="memdetails_value" v-if="userMemDetail.suburb==''" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{userMemDetail.suburb}}
        </span>
        <v-divider style="ru"></v-divider>
      </div>
      </v-flex>
    </v-layout>

    <calUserTime :userUid="$route.params.id" ></calUserTime>

  </div>
</template>
<script>
  import calUserTime from './calUserTime'

  export default {


    data(){
      return {
        userBasicDetail : {},
        userMemDetail : {}
      }
    },

    methods:{
      getSpecUserDetail(){
        let vm = this
        this.$store.state.db.db.ref('checkAuthDetail/' + vm.$route.params.id)
          .once('value',function (snapshot) {
            vm.userBasicDetail = snapshot.val()

            //
            vm.$store.state.db.db.ref('membershipDetail/' + vm.$route.params.id)
              .once('value',function(snapshot2){
                if(snapshot2.val() != null )
                  vm.userMemDetail = snapshot2.val()
                else
                  vm.userMemDetail = "This User is Not a Member !"
              })

          })
      }
    },

    beforeMount(){
      this.getSpecUserDetail()
    },

    components :{
      'calUserTime': calUserTime
    }
  }
</script>
<style>
.memdetails_head{
  font-weight: bolder;
  font-size: 20px
}
.memdetails_value{
  font-weight: 400;
  font-size: 17px;
  margin-left: 6px;
}
</style>
