<template>
  <div class="create-event">

    <v-form >
      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <v-text-field
            label="Title"
            v-model="event.title"
          ></v-text-field>
          <span v-if="event.title.length == 0" class="text-field-required-warning">
            You have not entered Title for the event !
          </span>
          <span class="junk">j</span>
        </v-flex>

      </v-layout>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md4 lg4>
          <v-text-field
            label="Venue"
            v-model="event.venue"
          ></v-text-field>
          <span v-if="event.venue.length == 0" class="text-field-required-warning">
            You have not entered Venue for the event !
          </span>
          <span class="junk">j</span>
        </v-flex>


        <v-flex xs12 md4 lg4>
          <v-text-field
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
        <v-flex xs12 lg4 sm7 md4 class="date-picker-div">
          <v-date-picker
            v-model="event.date"
            class="event-date-picker"
          >
          </v-date-picker>
          <span v-if="event.date.length == 0" class="text-field-required-warning">
            You have not selected any Date !
          </span>
          <span class="junk">j</span>
        </v-flex>


        <v-flex xs12 lg4 md4 sm7 class="time-picker-div">
          <v-time-picker
            v-model="event.time"
            class="event-time-picker"
          >
          </v-time-picker>
          <span v-if="event.time.length == 0" class="text-field-required-warning">
            You have not selected any Time !
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <br>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10>
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

      <br>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md4 lg4>
          <v-text-field
            label="Facebook"
            v-model="event.facebookLink"
          ></v-text-field>
          <span v-if="event.facebookLink.length == 0" class="text-field-optional-warning">
            Facebook Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>

        <v-flex xs12 md4 lg4>
          <v-text-field
            label="Twitter"
            v-model="event.twitterLink"
          ></v-text-field>
          <span v-if="event.twitterLink.length == 0" class="text-field-optional-warning">
            Twitter Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md4 lg4>
          <v-text-field
            label="Instagram"
            v-model="event.instagramLink"
          ></v-text-field>
          <span v-if="event.instagramLink.length == 0" class="text-field-optional-warning">
            instagram Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>

        <v-flex xs12 md4 lg4>
          <v-text-field
            label="Youtube"
            v-model="event.youtubeLink"
          ></v-text-field>
          <span v-if="event.youtubeLink.length == 0" class="text-field-optional-warning">
            YouTube Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md4 lg4>
          <v-text-field
            label="Newspaper"
            v-model="event.newspaperLink"
          ></v-text-field>
          <span v-if="event.newspaperLink.length == 0" class="text-field-optional-warning">
            Media Mentions - Newspaper Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>

        <v-flex xs12 md4 lg4>
          <v-text-field
            label="Web Link"
            v-model="event.webLink"
          ></v-text-field>
          <span v-if="event.webLink.length == 0" class="text-field-optional-warning">
            Media Mentions - Web Link (Optional !)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <br>

      <input type="file" @change="uploadFile($event)"/>
      <span v-for="(photo,i) in photos">
        {{photo.photoObj.name}}
        <img :src="photo.photoUrl" style="height:100px;width:100px;">
        <v-btn @click="removePhoto(i)">remove</v-btn>
      </span>

      <br>

      <v-btn @click="addField()">add more links</v-btn>

      <tr v-for="(field, index) in event.fields">
        <td><input type="text" v-model="field.url"></td>
        <td><input type="text" v-model="field.description"></td>
        <td>
        <a @click="removeField(index);">Remove</a>
        </td>
      </tr>

      <br>

      <v-layout row wrap justify-space-around>

        <v-flex xs12 md10 lg10>
          <v-btn @click="createEvent(event)" class="create-button">Create</v-btn>
        </v-flex>

      </v-layout>

    </v-form>


    <div v-show="showPreloader">submiting ...</div>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  //
  data(){
    return {

      showPreloader : false,

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
        photoUrl : []

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

      let vm = this

      if(this.event.title.length != 0 &&
        this.event.venue.length != 0 &&
          this.event.date.length != 0 &&
            this.event.time.length != 0){

        this.showPreloader = true

        this.$store.state.db.db.ref('events/').push(event)
        .then(function(snapshot){


          //if no photo uploaded
          if(vm.event.photoUrl.length == 0){
            vm.eventCreated()
          }else{

            for(let i in vm.photos){
              vm.$store.state.db.storage.ref('eventPhotos/'+
                vm.photos[i].photoUrl.slice(vm.photos[i].photoUrl.lastIndexOf('/')+1))
              .put(vm.photos[i].photoObj)
              .then(function(snapshot){
                  vm.eventCreated()
              })
            }
          }
        })
      }//if ends
      else{
        //toast
      }
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
  background: #fff;
}

.text-field-required-warning{
  color:#E55350;
  font-size:11px;
}

.text-field-optional-warning{
  color:grey;
  font-size:10px;
}

.event-date-picker{
  width: 100%;
}
.event-time-picker{
  width: 100%;
}

.create-button{
  float:right;
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

</style>
