import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./data/Model.js";
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app';
import 'firebase/firestore';
import apiInfo from "@/data/modules/apiConfig";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

firebase.initializeApp(apiInfo.firebase);

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App),

 beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        store.dispatch('setSignedIn');
        store.dispatch('initUser', user);
        store.dispatch('initMealState', user);
        store.dispatch('initSearchState', user);
        store.dispatch('initWorkoutState', user);
      }
  })
  },

created() {  
    this.$store.dispatch('INIT_SEARCH'); 
}
}).$mount("#app");