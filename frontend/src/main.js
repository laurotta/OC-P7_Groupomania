import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Vue.use(Vuex)

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    moment.locale('fr');
    return moment(String(value)).format('LL - LT')
  }
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
