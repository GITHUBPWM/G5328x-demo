import Vue from 'vue'
import Router from 'vue-router'

import Summary from "../components/Summary";
import PortManage from "../components/PortManage";
import Vlan from "../components/Vlan";



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'summary',
      component: Summary
    },{
      path: '/port',
      name: 'portManage',
      component: PortManage
    },{
      path: '/vlan',
      name: 'Vlan',
      component: Vlan
    }
  ]
})
