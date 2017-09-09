import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import firebaseui from 'firebaseui';
import router from './router'
import {config} from './firebase/config'
import {store} from './store'
import Vuetify from 'vuetify'
import '../node_modules/firebaseui/dist/firebaseui.css'
import '../node_modules/vuetify/dist/vuetify.min.css'
import './assets/css/lib/googleFont.css'

Vue.use(VueRouter)
Vue.use(Vuetify)

new Vue({
  router,
  store,
  created() {

    //auth Change Check
    const firebaseApp = firebase.initializeApp(config)
    store.state.auth.db = firebaseApp.database()

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {

        //this.$router.push('/success')
        store.state.auth.user = user

        //logout if not admin
        if(user.email != 'umang.admin1@gmail.com'){
          firebase.auth().signOut();
        }

        //
        setTimeout(() => {
          store.state.auth.isLoggedIn = true
        }, 1000);

      } else {

        //
        store.state.auth.isLoggedIn = false
        this.$router.push('/')
      }
    });

  },
  el: '#app',
  render: h => h(App)
});
