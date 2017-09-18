<template>
  <div>
    {{$route.params.id}}

    {{userBasicDetail}}
    {{userMemDetail}}
  </div>
</template>
<script>
  export default {

    data(){
      return {
        userBasicDetail : {},
        userMemDetail : {}
      }
    },

    methods:{
      getSpecUserDetail(){
        let vm = this
        this.$store.state.db.db.ref('userAuthDetail/' + this.$route.params.id)
          .once('value',function (snapshot) {
            vm.userBasicDetail = snapshot.val()

            //
            vm.$store.state.db.db.ref('membershipDetail/' + vm.$route.params.id)
              .once('value',function(snapshot2){
                if(snapshot2.val() != null )
                  vm.userMemDetail = snapshot2.val()
                else
                  vm.userMemDetail = "This User is Not a Member !"
              })

          })
      }
    },

    beforeMount(){
      this.getSpecUserDetail()
    }
  }
</script>
