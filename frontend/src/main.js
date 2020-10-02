import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Pour requêtes HTTP
import axios from 'axios'

// Pour mise en forme date et heure
import moment from 'moment'

// BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Configuration d'axios
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000/api/'

// Configuration de moment
Vue.filter('formatDate', function(value) {
  if (value) {
    moment.locale('fr');
    return moment(String(value)).format('LL - LT')
  }
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
