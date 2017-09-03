import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import Vuetify from 'vuetify';
import VueFormGenerator from "vue-form-generator";

import App from './App.vue';

import Home from './pages/Home.vue';
import Settings from './pages/Settings.vue';
import AddArtwork from './pages/AddArtwork.vue';
import AddEvent from './pages/AddEvent.vue';
import ListAllArtworks from './pages/ListAllArtworks.vue';


Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueFormGenerator);

const router = new VueRouter({
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      },
      {
        path: '/add-artwork',
        name: 'add_artwork',
        component: AddArtwork
      },
      {
        path: '/add-event',
        name: 'add_event',
        component: AddEvent
      },
      {
        path: '/all-artworks',
        name: 'all_artworks',
        component: ListAllArtworks
      }
    ]
  })

const app = new Vue({
    router,
    render: createEle => createEle(App),
    beforeCreate: function(){
      console.log("started app");
    }
}).$mount('#app')
