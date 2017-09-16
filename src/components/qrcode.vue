<template>
  <div>
    qrcode {{$route.params.id}}
    <qrcode value="Hello, World!" :options="qrPropObj"></qrcode>
  </div>
</template>

<script>

  import VueQrcode from 'vue-qrcode'

  export default {

    data(){
     return {
      qrPropObj : {}
     }
    },

    methods:{

    },

    computed:{

    },

    beforeMount(){
      this.qrPropObj = {
        size:200,
        value : this.$route.params.id
      }
    },

    components:{
      'qrcode' : VueQrcode
    }

  }
</script>
