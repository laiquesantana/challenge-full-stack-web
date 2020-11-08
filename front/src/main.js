import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './config/store';
import './config/bootstrap';
import vueResource from 'vue-resource';
import VueProgressBar from 'vue-progressbar'
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Este Campo é Obrigatório!'
});


Vue.use(vueResource)




const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
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
  ValidationProvider,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
