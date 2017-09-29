<template>
  <div>
    cal user time !

    {{userUid}}
  </div>
</template>

<script>
  export default{

    //props
    props:['userUid'],

    //data
    data(){
      return {

      }
    },

    //methods
    methods:{

      getUserAtt(){
        this.$store.state.db.db.ref('')
          .once('value',function(){

          })
      }

    },

    //beforeMount
    beforeMount(){

    }

  }
</script>
