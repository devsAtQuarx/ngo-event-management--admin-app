<template>
  <div>

  <v-layout row wrap justify-space-around>
    <v-flex xs12 md10 lg10>
      <v-card-media :src="specEventFromDb.downloadUrl[0]" height="30vh" v-if="specEventFromDb.downloadUrl != undefined">
      </v-card-media>
      <v-card-media src="/static/img/icons/umangFoundation.jpg" height="30vh" v-else>
      </v-card-media>
      <v-card-media class="main_image" height="30vh" >
        <v-layout column class="media">

          <v-card-title primary-title class="white--text">
            <div class="headline">{{specEventFromDb.title}}</div>
              <v-spacer></v-spacer>
            <v-bottom-sheet >
              <v-btn dark icon slot="activator" class="mr-0">
                <v-icon>collections</v-icon>
              </v-btn>
              <v-list style="overflow-y:scroll">
                <div style="margin-left:5vh">Event Gallary</div>
                <v-list-tile v-if="specEventFromDb.downloadUrl == undefined">This Event Gallary Is Empty
                </v-list-tile>

                <span v-else v-for="i in specEventFromDb.downloadUrl" style="height:375px;" >
                  <img :src="i" class="gallary_image">
                </span>

              </v-list>
            </v-bottom-sheet>
          </v-card-title>
          <v-subheader>
            <v-icon
              class="pl-3 pt-4">
              location_on
            </v-icon>
            <div
              class="white--text pl-0 pt-4">{{specEventFromDb.venue}}
            </div>
          </v-subheader>
            <v-card-text class="white--text pl-4 pt-4">
              <div>
                <v-icon class="icon">list</v-icon>
                <span>
                  {{specEventFromDb.category}}
                </span>
              </div>
              <br>
              <br>

              <div style="float:left">
                <v-icon class="icon">date_range</v-icon>
                <span>
                  {{specEventFromDb.date}}
                </span>
              </div>
              <div style="float:right">
                <v-icon class="icon">access_time</v-icon>
                <span>
                  {{specEventFromDb.time}}
                </span>
              </div>
          </v-card-text>
        </v-layout>
      </v-card-media>
      <v-card-text>{{specEventFromDb.description}}</v-card-text>
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


      <v-layout row justify-center style="position: relative;">
          <v-dialog v-model="dialog" lazy absolute >
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
                @click.native="dialog = false"
                >Cancel</v-btn>
                <v-btn class="grey--text darken-1" flat="flat"
                @click.native="dialog = false"
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
      sheet:false,
      dialog: false,
      specEventFromDb: {}
    }
  },

  //methods
  methods:{

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

    ])
  },

  beforeMount(){
    this.getSpecEvent()
  }
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
    margin-top:-30vh;
    filter:opacity(60%);
    height: 30vh;
  }

  .application--light .list {
    background: #fff;
    height: 400px;
}
  .gallary_image{
    padding: 2vh;
    height:50vh;
    width:53vh;
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
</style>
