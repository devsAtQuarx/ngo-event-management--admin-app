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
#app{
  background: #f5f5f5;
}
.input-group__details {
    padding-top: 0px;
    min-height: 1px;
}
.application--light .input-group.input-group--textarea:not(.input-group--full-width) .input-group__input{
  border: 1px solid rgba(0,0,0,.38);
}
</style>
