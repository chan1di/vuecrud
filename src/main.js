import Vue from 'vue'
import App from './App.vue'


import BootstrapVue from 'bootstrap-vue'


import router from './router/routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'bootstrap/js/dist/popover.js'
import 'bootstrap/dist/js/bootstrap'

Vue.config.productionTip = false

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
