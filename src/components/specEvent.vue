<template >
  <div >

    <div class="preload" v-show="this.loader2== true"></div>

<div v-show="this.loader2 == false" >
   <v-layout row wrap justify-space-around >

    <v-flex xs12 md10 lg10>

      <v-card-media :src="specEventFromDb.downloadUrl[0]" height="300px"
      v-if="specEventFromDb.downloadUrl != undefined">
      </v-card-media>
      <v-card-media v-else src="/static/img/icons/umangFoundation.jpg" height="300px">

      </v-card-media>
      <v-card-media class="main_image" height="300px" >
        <v-layout column class="media">

          <v-card-title primary-title class="white--text">

            <div class="headline">{{specEventFromDb.title}}</div>
              <v-spacer></v-spacer>
               <v-dialog v-model="dialog"  fullscreen transition="dialog-bottom-transition" >
              <v-btn dark icon slot="activator" class="mr-0" @click="vm.$store.state.auth.drawer = false">
                <v-icon>collections</v-icon>
              </v-btn>


              <v-card class="black show_image">

                <v-btn fab top left fixed icon @click.native="dialog = false" @click="vm.$store.state.auth.drawer = true">
                  <v-icon class="white--text">close</v-icon>
                </v-btn>
                <div class="white--text display-1 text-xs-center"v-if="specEventFromDb.downloadUrl == undefined">
                  This Event Gallary Is Empty
                </div>

                  <v-layout justify-space-around v-else>
                    <div class="preload" v-if="this.loader== true"></div>

                    <span style="align-self:center" v-show="this.loader== false">
                    <v-btn icon  @click="prev_image()"
                     v-if="cnt > 0">
                     <v-icon class="white--text display-3">keyboard_arrow_left
                     </v-icon>
                   </v-btn>
                   <v-btn icon  @click=""
                     v-else
                     ><v-icon class="grey--text display-3">keyboard_arrow_left
                     </v-icon>
                 </v-btn>
               </span>

                  <div class="white--text" >
                    <img :src="specEventFromDb.downloadUrl[cnt]" class="gallary_image" v-show="this.loader== false"
                    @load="loaded()"></img>
                  </div>

                  <span style="align-self:center" v-show="this.loader== false">
                  <v-btn icon  @click="next_image()"
                    v-if="cnt < specEventFromDb.downloadUrl.length-1"
                    ><v-icon class="white--text display-3">keyboard_arrow_right
                    </v-icon>
                </v-btn>
                <v-btn icon  @click=""
                  v-else
                  ><v-icon class="grey--text display-3">keyboard_arrow_right
                  </v-icon>
              </v-btn>
              </span>

              </v-layout>

              </v-card>

            </v-dialog>
          </v-card-title>
          <v-subheader>
            <v-btn dark icon disabled>
            <v-icon class="pl-3 pt-4 white--text">
              location_on
            </v-icon></v-btn>
            <div
              class="white--text pl-0 pt-4">{{specEventFromDb.venue}}
            </div>
          </v-subheader>
            <v-card-text  class="white--text pl-0 pt-4">
              <div style="float:left">
                <v-btn dark icon disabled>
                <v-icon class="pl-3 pt-0 white--text">
                  list</v-icon></v-btn>

                <span>
                  {{specEventFromDb.category}}
                </span>
              </div>
              <div style="float:right">
                <v-btn dark icon disabled>
                <v-icon class="pl-3 pt-0 white--text" style="font-size:15px">
                  fa-hourglass-half</v-icon></v-btn>

                <span>
                  {{specEventFromDb.duration}} hrs
                </span>
              </div>
              <br>
              <br>
              <br>
              <div style="float:left;padding-top:78px">
                <v-btn dark icon disabled>
                <v-icon class="pl-3 pt-0 pb-2 white--text">
                date_range</v-icon></v-btn>
                <span>
                  {{specEventFromDb.date}}
                </span>
              </div>
              <div style="float:right;padding-top:78px">
                <v-btn dark icon disabled>
                <v-icon class="pl-3 pt-0 pb-2 white--text">
                access_time</v-icon></v-btn>
                <span>
                  {{specEventFromDb.time}}
                </span>
              </div>
          </v-card-text>
        </v-layout>
      </v-card-media>
      <v-card-text v-if="specEventFromDb.description != ''">{{specEventFromDb.description}}</v-card-text>
      <v-card-text v-else class="display-1 grey--text text-xs-center">There's no Description given about this Event</v-card-text>
      <div id="iconLinks">
        <a :href="specEventFromDb.facebookLink"
        v-if="specEventFromDb.facebookLink!=''">
        <v-icon
          class=" display-1" style="color:#01579b">
          fa-facebook-official
        </v-icon>
      </a>
        <a :href="specEventFromDb.twitterLink"
        v-if="specEventFromDb.twitterLink!=''">
        <v-icon
          class="cyan--text display-1">
          fa-twitter-square
        </v-icon>
        </a>
        <a :href="specEventFromDb.instagramLink"
        v-if="specEventFromDb.instagramLink!=''">
        <v-icon
          class="purple--text display-1">
          fa-instagram
        </v-icon>
      </a>
      <a :href="specEventFromDb.youtubeLink"
        v-if="specEventFromDb.youtubeLink!=''">
        <v-icon
          class="black--text display-1" style="color:#d50000!important;">
          fa-youtube-play
        </v-icon>
      </a>
      <a :href="specEventFromDb.newspaperLink"
        v-if="specEventFromDb.newspaperLink!=''">
        <v-icon
          class="blue-grey--text display-1">
          fa-newspaper-o
        </v-icon>
      </a>
      <a :href="specEventFromDb.webLink"
        v-if="specEventFromDb.webLink!=''">
        <v-icon
          class="blue--text display-1">
          fa-globe
        </v-icon>
      </a>
      <v-menu
     offset-x
     :close-on-content-click="false"
     :nudge-width="200"
     v-if="specEventFromDb.fields !=undefined"

     style="margin-left:-2vh"
   >
   <v-btn icon slot="activator" >
     <v-icon>fa-caret-down</v-icon>
   </v-btn>

     <v-list style="height:fit-content">
       <template v-for="field in specEventFromDb.fields">
       <div class="grey--text">
         <v-icon class="grey--text" style="margin-left:10px">fa-globe</v-icon>
              <a :href="field.url" class="grey--text"><span style="font-weight:500;margin-left:4px">
           {{field.url}}
         </span></a>
       </div>
       <div class="grey--text">
         <v-icon class="grey--text " style="margin-left:10px;font-size:15px">mode_edit</v-icon>
         <span style="margin-left:4px;font-size:15px">
           {{field.description}}
         </span>
       </div>
       <v-divider></v-divider>
     </template>
     </v-list>

   </v-menu>
      </div>
      <br>
      <br>



    </v-flex>
   </v-layout>
</div>

<v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialog2" lazy absolute >
      <v-btn
      dark
       fab
       right
       bottom
       fixed
       slot="activator"
        class="create-button"
       ><v-icon class="white--text delete_icon">delete</v-icon></v-btn>
      <v-card>
        <v-card-title>
          <div class=" grey--text darken-1" >Are you sure you want to delete this event?</div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="grey--text darken-1" flat="flat"
          @click.native="dialog2 = false"
          >Cancel</v-btn>
          <v-btn class="grey--text darken-1" flat="flat"
          @click.native="dialog2 = false"
          @click="delEvent(specEventFromDb)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</v-flex>
</v-layout>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  data(){
    return {
     vm:this,
     dialog: false,
     dialog2: false,
     cnt:0,
     loader:false,
     loader2:false,
     specEventFromDb: {}
   }
  },

  //methods
  methods:{
    prev_image(){
    this.cnt--
   this.loader=true
},
    loaded(){
      this.loader=false
    },
    next_image(){
        this.cnt++
        this.loader=true
    },
    loaded2 () {
      if(this.specEventFromDb.downloadUrl != '')
        {
          setTimeout(() => (this.loader2 = false), 3000)
        }
    },

    getSpecEvent(){
      let vm = this

      this.$store.state.db.db.ref('events/' + this.$route.params.id)
      .once('value',function(snapshot){
        //console.log(snapshot.val())
        vm.specEventFromDb = snapshot.val()
      })
    },

    delEvent(specEventFromDb){
      let vm = this

      //console.log(key)
      this.$store.state.db.db.ref('events/' + this.$route.params.id).remove()
      .then(function(){

          //vm.$store.state.events.eventsArr.splice(specEvent.index,1)
          //
          for(let i in vm.$store.state.events.eventsArr){
            if(vm.$store.state.events.eventsArr[i].key == vm.$route.params.id){
              vm.$store.state.events.eventsArr.splice(i,1)
              //console.log("del")
              break
            }
          }
          //
          vm.$store.state.events.eventDeleted = true
          vm.$router.push('/success')
      })
    }
  },

  //computed
  computed:{
    ...mapGetters([
      'drawer'
    ])
  },
  beforeMount(){
     this.getSpecEvent(),
     this.vm,
     this.loader2=true
    console.log(this.loader2)
    this.loaded2()
   },
   beforeUpdate(){
     this.loader2=false
     console.log(this.loader2)
   },

}
</script>
<style scoped>
.icon{
   color:#fff;
   font-size: 20px
 }
 .main_image{
   background:black;
   z-index:2;
   margin-top:-300px;
   filter:opacity(60%);
   height: 30vh;
 }
 .application--light .list {
   background: #fff;
   height: 400px;
}
.show_image{
 height: auto;
align-items: center;
display: flex;
justify-content: center;
}
 .main_image_card{
   padding: 16px;
   width: 80%;
   margin-top: -350px;
   font-size: 15px;
 }
 .layout.column {
     -webkit-box-orient: vertical;
     -webkit-box-direction: normal;
     -ms-flex-direction: column;
     flex-direction: column;
     height: 0vh;
 }
 .card__media__background {
   border-radius: inherit;
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 30vh;
}
.gallary_image{
 max-height: 500px;
 max-width:100%;
}
 .headline{
   font-size: 24px!important;
   font-weight: 400!important;
   line-height: 32px!important;
   letter-spacing: normal!important;
   padding-top: 0.2vh;
   width:80%;
 }
 .subheader {
   height: 48px;
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-align: center;
   -ms-flex-align: center;
   align-items: center;
   font-size: 14px;
   font-weight: 500;
   /* padding: 0 16px; */
   padding-top: 2vh;
    margin-left: -3vh;
}
a {
   color: transparent;
}
#iconLinks{
     text-align: -webkit-center;
}
.delete_icon{
 margin-top: 3px;
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
.delete_icon{
  margin-top: 3px;
}

</style>
