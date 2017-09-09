<template>
  <div>
    events

    <v-btn fab dark class="teal fixed-floating-button" @click="goToCreateEvent">
      <v-icon dark>add</v-icon>
    </v-btn>

  </div>
</template>

<script>
export default{

  //methods
  methods:{
    goToCreateEvent(){
      this.$router.push('/success/createEvent')
    }
  },

  //mounted
  mounted(){

  }
}
</script>

<style scoped>
.fixed-floating-button{
  position:fixed;
  right: 20px;
  bottom :20px;
}
</style>
