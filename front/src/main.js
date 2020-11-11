import 'font-awesome/css/font-awesome.css'

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './config/store';
import './config/bootstrap';
import VueProgressBar from 'vue-progressbar'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import VueMask from 'v-mask'
import VueSweetalert2 from 'vue-sweetalert2';
import './message'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(VueMask);




window.Vue = require('vue');

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(Vuetify, {
  iconfont: 'mdi'

})


Vue.use(VueSweetalert2);



const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '10px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

Vue.config.productionTip = false

Vue.component('Main', require('./components/Menu.vue').default);
Vue.component('Header', require('./components/Header.vue').default);
Vue.component('Content', require('./components/Content.vue').default);
Vue.component('UserDropDown', require('./components/UserDropDown.vue').default);
Vue.component('Footer', require('./components/Footer.vue').default);



new Vue({
  router,
  store,
  vuetify,
 render: h => h(App)
}).$mount('#app')
