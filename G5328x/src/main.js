// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from "./store"
import common from './js/common'
import con_config from './js/con_config'
import axios from 'axios'
// import less from 'less'
//
//
// Vue.use(less);


Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.prototype.common = common;
Vue.prototype.con_config = con_config;
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://192.168.98.17:3010/mock/124";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/* eslint-disable no-new */
const myVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default myVue;
