<template>
  <div>
    manage registered users
    <download-excel
      class   = "btn btn-default"
      :data   = "json_data"
      :fields = "json_fields"
      name    = "filename.xls">

      Download Excel (you can customize this with html code!)

    </download-excel>
  </div>
</template>

<script>
  import JsonExcel from 'vue-json-excel'

  export default {

    data(){
      return{
        json_fields : {
          "name"      : "String",
          "city"      : "String",
          "country"   : "String",
          "birthdate" : "String",
          "amount"    : "Number"
        },
        json_data : [
          {
            "name"      : "Tony Peña",
            "city"      : "New York",
            "country"   : "United States",
            "birthdate" : "1978-03-15",
            "amount"    : 42
          },
          {
            "name"      : "Thessaloniki",
            "city"      : "Athens",
            "country"   : "Greece",
            "birthdate" : "1987-11-23",
            "amount"    : 42
          }
        ]
      }
    },

    components:{
      'downloadExcel':JsonExcel
    }
  }
</script>
