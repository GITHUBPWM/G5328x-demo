import Vue from 'vue'
import Router from 'vue-router'

import Summary from "../views/commonFunc/Summary.vue";
import Tools from "../views/commonFunc/Tools.vue";
import GlobalMap from "../views/visualization/GlobalMap.vue";
import Snoop from "../views/switch/Snoop.vue";
import Queue from "../views/qos/Queue.vue"
import Index from "../views/Index.vue";







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
      name: 'index',
      component: Index,
      redirect:'/commonFunc',
      children:[
        {
          path:'commonFunc',
          name:'commonFunc',
          redirect:'/commonFunc/summary',
          children:[
            {
              path:'summary',
              name:'summary',
              component: Summary
            },{
              path:'tools',
              name:'tools',
              component: Tools
            },
          ]
        },{
          path:'switch',
          name: 'switch',
          redirect:'/switch/snoop',
          children:[
            {
              path:'snoop',
              name:'snoop',
              component:Snoop
            }]
        },{
          path:'qos',
          name: 'qos',
          redirect: '/qos/queue',
          children: [
            {
              path:'queue',
              name:'queue',
              component:Queue
            }
          ]
        },{
          path:'visualization',
          name: 'visualization',
          redirect: '/visualization/globalMap',
          children: [
            {
              path:'globalMap',
              name:'globalMap',
              components:{
                content:GlobalMap
              }
            }
          ]
        }
      ]
    }
  ]
})
