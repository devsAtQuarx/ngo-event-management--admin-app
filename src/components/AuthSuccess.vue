<template>
  <div>

    <v-navigation-drawer
      persistent
      v-model="vm.$store.state.auth.drawer"
      light
      enable-resize-watcher
      overflow
      class="grey lighten-4"
      style="z-index:5"

    >
      <v-list dense class="grey lighten-4">

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{user.displayName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <hr>

        <v-list-tile @click="goToHome">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="manageRegisteredUsers()">
          <v-list-tile-action>
            <v-icon style="font-size:15px">fa-users</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manage Registered Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>




        <v-list-tile @click="sendPushNot2()">
          <v-list-tile-action>
              <v-icon>notifications</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <v-list-tile-title>Send Push Notification</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>


      <v-list-tile @click="logOut()">
          <v-list-tile-action>
            <v-icon style="font-size:20px">fa-sign-out</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>LogOut</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>


        <!--v-list-tile @click="sendPushNot()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Send Push Notification</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile-->

      </v-list>
    </v-navigation-drawer>


      <v-toolbar class="white grey--text" style="z-index:4" dark fixed>
         <v-toolbar-side-icon class="grey--text" @click.stop="vm.$store.state.auth.drawer = !vm.$store.state.auth.drawer"></v-toolbar-side-icon>

         <v-toolbar-title>Toolbar</v-toolbar-title>
       </v-toolbar>

      <main>
        <v-container fluid>
          <transition name="fade" mode="out-in" v-on:after-enter="" appear>
            <router-view></router-view>
          </transition>
        </v-container>
      </main>

    </div>
  </template>
<script>
import {mapGetters} from 'vuex'
import firebase from 'firebase'

export default {

  //
  data(){
     return {
       vm:this,
       drawer:true
     }
   },

   //
   created() {

   },

  //
  methods: {

    //
    manageRegisteredUsers(){
      this.$router.push('/manageRegisteredUsers')
    },

    //logOut
    logOut() {
      firebase.auth().signOut();
    },

    //goToHome
    goToHome(){
      this.$router.push('/success')
    },

    sendPushNot(){
      location.href = 'https://onesignal.com/'
    },

    sendPushNot2(){
      this.$router.push('/sendPushNot2')
    }
  },

  //components
  components:{

  },

  //
  computed:{
    ...mapGetters([
      'user'
    ])
  },
  beforeMount(){
    this.vm
  }
};
</script>
