<template>
  <div>

  <!--  qrcode {{$route.params.id}} -->
    <!--qrcode value="Hello, World!" :options="qrPropObj"></qrcode-->

  <v-layout justify-space-around style="height: -webkit-fill-available;display:flex;">


        <qr-code
          style="align-self:center"
          :text="text"
          size="200"
          color="#f1c40f"
          bg-color="#3498db"
          error-level="L">
        </qr-code>

  </v-layout>



</div>
</template>

<script>

 // import VueQrcode from 'vue-qrcode'
  import VueQRCodeComponent from 'vue-qrcode-component'

  export default {

    data(){
     return {
      qrPropObj : {},
       text : ''
     }
    },

    methods:{

    },

    computed:{

    },

    beforeMount(){
      /*this.qrPropObj = {
        size:200,
        value : this.$route.params.id
      }*/
      this.text = this.$route.params.id
    },

    components:{
      //'qrcode' : VueQrcode,
      'qr-code':VueQRCodeComponent
    }

  }
</script>
