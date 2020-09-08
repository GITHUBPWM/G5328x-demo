import Vue from 'vue'
import Router from 'vue-router'

import Summary from "../views/Summary.vue";
import PortManage from "../views/PortManage.vue";
import Vlan from "../views/Vlan.vue";
import ChangeSetting from "../views/ChangeSetting.vue";
import RouterSetting from  "../views/RouterSetting.vue"
import Visual from "../views/Visual.vue";
import Qos from "../views/Qos.vue";
import NetSafe from "../views/NetSafe.vue";
import DevManage from "../views/DevManage.vue";
import ManageMaintain from "../views/ManageMaintain.vue";





//解决vue-route 3.0版本以上重复路由时报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Summary',
      component: Summary
    }, {
      path: '/summary',
      name: 'Summary',
      component: Summary
    },{
      path: '/portManage',
      name: 'PortManage',
      component: PortManage
    },{
      path: '/vlan',
      name: 'Vlan',
      component: Vlan
    },{
      path: '/changeSetting',
      name: 'ChangeSetting',
      component: ChangeSetting
    },{
      path: '/routerSetting',
      name: 'RouterSetting',
      component: RouterSetting
    },{
      path: '/visual',
      name: 'Visual',
      component: Visual
    },{
      path: '/qos',
      name: 'Qos',
      component: Qos
    },{
      path: '/netSafe',
      name: 'NetSafe',
      component: NetSafe
    },{
      path: '/devManage',
      name: 'DevManage',
      component: DevManage
    },{
      path: '/manageMaintain',
      name: 'ManageMaintain',
      component: ManageMaintain
    }
  ]
})
