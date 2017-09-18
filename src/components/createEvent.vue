<template>
  <div class="create-event">

    <v-form >
      <v-layout row wrap justify-space-around >
        <v-flex xs12 md10 lg10 >
          <v-text-field
            label="Title"
            prepend-icon="event"
            v-model="event.title"
          ></v-text-field>
          <span v-if="event.title.length == 0" class="text-field-required-warning">
            You have not entered Title for the event !
          </span>
          <span class="junk">j</span>
        </v-flex>

      </v-layout>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <v-text-field
            label="Venue"
            prepend-icon="location_on"
            v-model="event.venue"
          ></v-text-field>
          <span v-if="event.venue.length == 0" class="text-field-required-warning">
            You have not entered Venue for the event !
          </span>
          <span class="junk">j</span>
        </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <v-text-field
          prepend-icon="list"
            label="Category"
            v-model="event.category"
          ></v-text-field>
          <span v-if="event.category.length == 0" class="text-field-required-warning">
            You have not entered Category of the event !
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>






<v-layout row wrap justify-space-around>
  <v-flex xs12 md10 lg10>
  <v-dialog
    persistent
    v-model="modal"
    lazy
    full-width
  >
    <v-text-field
      slot="activator"
      label="YY/MM/DD"
      v-model="event.date"
      prepend-icon="date_range"
      readonly
    ></v-text-field>
    <v-date-picker v-model="event.date" scrollable >
      <template scope="{ save, cancel }">
        <v-card-actions>
          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
          <v-btn flat primary @click.native="save()">Save</v-btn>
        </v-card-actions>
      </template>
    </v-date-picker>
  </v-dialog>
  <div v-if="event.date.length == 0" class="text-field-required-warning">
    You have not selected any Date !
  </div>
  <span class="junk">j</span>
</v-flex>

</v-layout>
<v-layout row wrap justify-space-around>
<v-flex xs12 md10 lg10>
  <v-dialog
    persistent
    v-model="modal2"
    lazy
    full-width
  >
    <v-text-field
      slot="activator"
      label="hr:min"
      v-model="event.time"
      prepend-icon="access_time"
      readonly
    ></v-text-field>
    <v-time-picker v-model="event.time" actions>
      <template scope="{ save, cancel }">
        <v-card-actions>
          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
          <v-btn flat primary @click.native="save()">Save</v-btn>
        </v-card-actions>
      </template>
    </v-time-picker>
  </v-dialog>
  <div v-if="event.time.length==0" class="text-field-required-warning">
    You have not selected any Time !
  </div>
  <span class="junk">j</span>
</v-flex>


</v-layout>





      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <div>

          <v-text-field
            label="Facebook"
            prepend-icon=" fa-facebook-official"
            v-model="event.facebookLink"
            ></v-text-field>
        </div>
          <span v-if="event.facebookLink.length == 0" class="text-field-optional-warning">
            Facebook Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>
        <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <v-text-field
            label="Twitter"
            prepend-icon="fa-twitter-square "
            v-model="event.twitterLink"
          ></v-text-field>
          <span v-if="event.twitterLink.length == 0" class="text-field-optional-warning">
            Twitter Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <v-text-field
            label="Instagram"
              prepend-icon="fa-instagram"
            v-model="event.instagramLink"
          ></v-text-field>
          <span v-if="event.instagramLink.length == 0" class="text-field-optional-warning">
            Instagram Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <v-text-field
            label="Youtube"
              prepend-icon="fa-youtube-play "
            v-model="event.youtubeLink"
          ></v-text-field>
          <span v-if="event.youtubeLink.length == 0" class="text-field-optional-warning">
            YouTube Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <v-text-field
            label="Newspaper"
              prepend-icon="fa-newspaper-o"
            v-model="event.newspaperLink"
          ></v-text-field>
          <span v-if="event.newspaperLink.length == 0" class="text-field-optional-warning">
            Media Mentions - Newspaper Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
          <v-btn id="addMoreLinkBut" @click="addField() " icon class="grey--text">
            <v-icon >add_circle_outline</v-icon>
          </v-btn>
          <v-text-field
            label="Web Link"
            prepend-icon="fa-globe"
            v-model="event.webLink"
          ></v-text-field>
          <v-flex xs12 sm3>

          </v-flex>
          <span v-if="event.webLink.length == 0" class="text-field-optional-warning">
            Media Mentions - Web Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>




            <br>

            <v-layout row wrap justify-space-around>

            <div v-for="(field, index) in event.fields">

              <v-text-field style="float:left" full-width label="URL"type="text" prepend-icon="fa-globe" v-model="field.url"></v-text-field>

              <v-text-field style="float:right" full-width label="Description"  type="text" prepend-icon="edit" v-model="field.description"></v-text-field>
              <span>
                <v-btn flat id="remove_link_but"@click="removeField(index);" class="grey--text" >
                  <v-icon >fa-times-circle-o</v-icon>
                </v-btn>
              </span>
            </div>
          </v-layout>
            <br>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md0 lg0>

      </v-flex>
        <v-flex xs10 md10 lg10>

          <v-text-field
            name="input-1"
            label="Description"
            textarea
            v-model="event.description"
            class="event-description"
          ></v-text-field>
          <span v-if="event.description.length == 0" class="text-field-optional-warning">
            Event Description (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>
      <v-layout row wrap id="choose_file_input">

        <input
        class="hide_file"
        type="file"
         id="choose_image"
         @change="uploadFile($event)">
      >
      <span id="file_upload_icon"><v-icon>file_upload</v-icon></span>

      </v-layout>
        <br>
        <br>
        <br>

        <v-layout row wrap justify-space-around style="float:left;background:">
        <span v-for="(photo,i) in photos"  >
        <!--  {{photo.photoObj.name}} -->
          <img :src="photo.photoUrl" id="uploaded_photo"style="height:200px;width:175px;" >
           <v-avatar  id="remove_photo_button"  class=" elevation-4" @click="removePhoto(i)" ><v-icon id="remove_photo_icon" >clear</v-icon></v-avatar>
          <!--v-btn id="remove_photo_button"  @click="removePhoto(i)" >Remove</v-btn-->
          <v-spacer></v-spacer>
        </span>
        </v-layout>




      <!--v-layout row justify-center style="position: relative;">
        <v-flex xs12 md10 lg10>
            <v-dialog v-model="dialog" lazy absolute>
            <v-btn small primary dark right bottom  fixed  slot="activator" @click="createEvent(event)" class="create-button" v-show="!showPreloader">Create</v-btn>
            <v-card-title>
               <div class="headline">Use Google's location service?</div>
             </v-card-title>
             <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
               <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
             </v-card-actions>
            </v-card>
            </v-dialog>
        </v-flex>

      </v-layout-->
      <v-layout row justify-center style="position: relative;">
  <v-dialog v-model="dialog" lazy absolute v-if="!showPreloader">
    <v-btn
    small
     primary
     dark
     right
     bottom
     fixed
     slot="activator"
     @click="createEvent(event)"
     class="create-button"
     v-show="!showPreloader">Create</v-btn>
    <v-card>
      <v-card-title>
        <div class="headline grey--text darken-1" >Please Fill the Required field/s  :)</div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="grey--text darken-1" flat="flat" @click.native="dialog = false">OK</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>


    </v-form>

    <div class="preload" v-show="showPreloader"></div>





  </div>
</template>

<script>
import {mapGetters} from 'vuex'


export default{

  //
  data(){
    return {
       dialog: false,
      showPreloader : false,
      e3: null,
      menu: false,
      modal: false,
      e6: null,
       menu2: false,
       modal2: false,


      //input value
      event : {
        title : '',
        venue : '',
        category:'',
        description : '',

        //date
        date: '',
        time : '',

        facebookLink : '',
        twitterLink : '',
        instagramLink:'',
        youtubeLink : '',
        otherSocialMediaLink1 : '',
        otherSocialMediaLink2:'',

        newspaperLink:'',
        webLink:'',

        fields : [],
        photoUrl : [],
        downloadUrl : []

      },
      photos:[],
    }
  },

  //components
  components:{

  },

  //methods
  methods:{

    //addField
    addField() {
        //var elem = document.createElement('tr');
        this.event.fields.push({
          url : "",
          description : ""
        })
    },

    //onEventCreate
    eventCreated(){
      this.showPreloader = false
      this.$router.push('/success')
    },

    //removeElement
    removeField(index) {
        this.event.fields.splice(index, 1);
    },

    //uploadFile
    uploadFile(event){
      //console.log(event)
      //console.log(this.photos)
      //console.log(URL.createObjectURL(event.target.files[0]))
      let tempPhotoObj = {
         photoObj : event.target.files[0],
         photoUrl : URL.createObjectURL(event.target.files[0])
      }

      this.photos.push(tempPhotoObj)

      this.event.photoUrl.push(tempPhotoObj.photoUrl.slice(tempPhotoObj.photoUrl.lastIndexOf('/')+1))
      //console.log(this.event.photoUrl)

    },

    //removePhoto
    removePhoto(index){
      //console.log(index)
      //delete
      this.photos.splice(index,1)
      this.event.photoUrl.splice(index,1)
    },

    //createEvent
    createEvent(event){
      //console.log(event)
      let vm = this

      if(this.event.title.length != 0 &&
        this.event.venue.length != 0 &&
          this.event.date.length != 0 &&
            this.event.time.length != 0){

        this.showPreloader = true

        let c = 0

        //if no photo uploaded
        if(vm.event.photoUrl.length == 0){
          vm.saveInDb(event)
        }else{

          for(let i in vm.photos){

            let uploadTask = vm.$store.state.db.storage.ref('eventPhotos/'+
              vm.photos[i].photoUrl.slice(vm.photos[i].photoUrl.lastIndexOf('/')+1))
              .put(vm.photos[i].photoObj)

            uploadTask.on('state_changed', function(snapshot) {

            }, function(error){

            },function(){
              console.log(uploadTask.snapshot.downloadURL)
              event.downloadUrl.push(uploadTask.snapshot.downloadURL)
              console.log(c + " " + vm.photos.length)
                c++
              if(c == vm.photos.length)
                vm.saveInDb(event)
            })

          }

        }

      }//if ends
      else{
        //toast
      }

    },

    saveInDb(event){
      let vm = this
      this.$store.state.db.db.ref('events/').push(event)
      .then(function(snapshot){
        vm.$store.state.events.newEventAdded = true  // added new*
        //console.log(vm.$store.state.events.createEvent)
        vm.eventCreated()
      })
    }

  },

  //computed
  computed:{
    ...mapGetters([

    ])
  }

  //
}
</script>


<style scoped>
.create-event{
  background: #f5f5f5;
}

.text-field-required-warning{
  color:#E55350;
  font-size:11px;
  margin-left: 42px;
}

.text-field-optional-warning{
  color:grey;
  font-size:10px;
  margin-left: 42px;
}

.event-date-picker{
  width: 100%;
}
.event-time-picker{
  width: 100%;
}

.create-button{
  float:right;
  z-index: 6000;

}

.date-picker-div{
  margin-top: 40px;
}
.time-picker-div{
  margin-top: 40px;
}

.junk{
  visibility: hidden;
}
.event-date-picker{
  margin-bottom: -20px
}
#addMoreLinkBut{
  position: relative;
    float: right;
    margin-bottom: -10vh;
    z-index: 1;
    margin-top: 2vh;
    border-radius: 0px;
    height: 0px;
    width: 0px;
    border: 1px solid none;
}
#remove_link_but{
  position: relative;
  float: right;
  margin-bottom: 0vh;
  z-index: 1;
  margin-top: -15vh;
  border-radius: 0px;
  height: 0px;
  width: 0px;
  border: 1px solid none;
  /* font-weight: 100; */
}
#addMoreLinkInput{
  justify-content: space-between;
}
#remove_photo_icon{
  margin-top: 1.3vh;
  color:grey;
  font-weight: 700
}
#remove_photo_button{
    height: 35px!important;
    width: 35px!important;
    margin-left: -3vh;
    margin-bottom: 1vh;
    border: 3px solid grey;
    background: white;
}
#choose_image{
  color: transparent;
}

#choose_file_input{
  background: transparent;
  border: 1px solid grey;
  position: relative;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  float: left;
  height: 50px;
  width: 50px;
  margin-left: 7vh;


}
.hide_file {
    position: absolute;

    opacity: 0;
    cursor: pointer;
    right: 0;
    top: 0;
    height: 100%;
    font-size: 24px;
    width: 100%;
}
#file_upload_icon{
  margin-left: 4px;
  margin-top: 12px;

}
#uploaded_photo{
  height: 200px;
width: 175px;
border:2px solid grey;
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
