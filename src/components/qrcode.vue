<template>
  <div>

    <p class="grey--text text-xs-center qr_text">
      Scan this Code for Attendance
    </p>
  <!--  qrcode {{$route.params.id}} -->
    <!--qrcode value="Hello, World!" :options="qrPropObj"></qrcode-->

  <v-layout row wrap justify-space-around>


        <qr-code
          class="qr text-xs-center"
          :text="text"
          size="200"
          color="#000"
          bg-color="#fff"
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
<style>
.qr{
    position: fixed;
    top: 45%;
    height: 30px;
    /*margin: -42px 0 0 -12px;*/
}
.qr_text{
  font-weight: bolder;
  font-size: 24px;
}
</style>
