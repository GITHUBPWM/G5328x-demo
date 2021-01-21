// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from "./store"
import common from './js/common'
import con_config from './js/con_config'
import '@reasy-team/reasy-ui-vue/dist/styles.css';
import ReasyUIVue from '@reasy-team/reasy-ui-vue';
import my_plugins from "./js/my_plugins";
import http from "./js/http";

Vue.use(ReasyUIVue);
import Help from "./views/help/Help"
// import less from 'less'
//
//
// Vue.use(less);


Vue.use(Vuex);
Vue.use(my_plugins);
Vue.use(http);



Vue.config.productionTip = false;
Vue.prototype.common = common;
Vue.prototype.con_config = con_config;




//可以用这种创建vue实例的方法来达到所有页面使用的组件都是同一个的效果（帮助信息），就不用借助store来传值
//如果只是组件注册，然后只在根组件里面使用它，所有使用的也是同一个，这样不知道各个页面要怎么传值给他来控制它的显示隐藏，只能借助store
// let helpInfo = new Vue({
//   el: "#help",
//   template:"<Help/>",
//   components: { Help },
//   data: {
//       show: true,
//       location: ""
//   },
// });
// Vue.prototype.helpInfo = helpInfo;
// 这样在别的页面就可以直接通过这种方法改变组件的值：
// this.helpInfo.show = true;




/* eslint-disable no-new */
const myVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default myVue;
