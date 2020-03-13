import Vue from 'vue';
import App from './app.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '224061374280-0o1cr1rf7d21s95nkflc34lpt7hpu8j4.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
    render : h => h(App)
}).$mount('#app')