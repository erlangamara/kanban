import Vue from 'vue';
import App from './app.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '224061374280-k6k0fvlfir7vn13ecmq9u9bjlrrd4eal.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
    render : h => h(App)
}).$mount('#app')