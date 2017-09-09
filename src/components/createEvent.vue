<template>
  <div>

    Create Event

    <v-form >

      <v-text-field
        label="Event Title"
        v-model="event.title"
      ></v-text-field>
      <span v-if="event.title.length == 0" class="text-field-required-warning">
        You have not entered Title for the event !
      </span>

      <br>

      <v-text-field
        label="Event Venue"
        v-model="event.venue"
      ></v-text-field>
      <span v-if="event.venue.length == 0" class="text-field-required-warning">
        You have not entered Venue for the event !
      </span>

      <br>

      <v-text-field
        label="Media Link"
        v-model="event.mediaLink"
      ></v-text-field>
      <span v-if="event.mediaLink.length == 0" class="text-field-optional-warning">
        Optional !
      </span>

      <br>
      <br>

      <v-date-picker
        v-model="event.picker"
        class="event-date-picker"
      >
      </v-date-picker>
      <span v-if="event.picker.length == 0" class="text-field-required-warning">
        You have not selected any Date !
      </span>

      <br>
      <br>

      <v-btn @click="createEvent(event)">Create</v-btn>

    </v-form>



  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  //
  data(){
    return {
      //input value
      event : {
        title : '',
        venue : '',

        //date
        picker: '',

        mediaLink : ''
      }

    }
  },

  //components
  components:{

  },

  //methods
  methods:{

    //createEvent
    createEvent(event){

      if(this.event.title.length != 0 &&
          this.event.venue.length != 0 &&
          this.event.picker.length != 0){
        this.$store.state.auth.db.ref('events/').push(event)
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
.text-field-required-warning{
  color:red;
  font-size:10px;
}

.text-field-optional-warning{
  color:grey;
  font-size:10px;
}

.event-date-picker{

}


</style>
