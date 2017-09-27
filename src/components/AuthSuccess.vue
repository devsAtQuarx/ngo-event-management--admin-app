<template>
  <div>

    <v-navigation-drawer
      persistent
      v-model="drawer"
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

        <v-list-tile @click="logOut()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>LogOut</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="manageRegisteredUsers()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manage Registered Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sendPushNot()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Send Push Notification</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="sendPushNot2()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Send Push Notification 2</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="red accent-3" style="z-index:4" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-container>
        <router-view></router-view>
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
       drawer : true
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
  }
};
</script>
