<template>
  <v-app id="app" >

    <main>
        <router-view></router-view>
    </main>

  </v-app>
</template>


<script>
import {mapGetters} from 'vuex'

export default {
  name: 'app',

  data(){
    return {

    }
  },

  //components
  components:{

  },

  //mehtods
  methods:{

  },

  //computed
  computed:{
    ...mapGetters([

    ])
  }
}
</script>

<style>
.input-group__details {
    padding-top: 0px;
    min-height: 1px;
}
</style>
