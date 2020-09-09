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
          path:'/commonFunc',
          name:'commonFunc',
          redirect:'/commonFunc/summary',
          meta:{
            label:"常用功能",
            icon:"iconfont icon-fangzi"
          },
          children:[
            {
              path:'summary',
              name:'summary',
              component: Summary,
              meta:{
                label:"系统概览"
              },
            },{
              path:'tools',
              name:'tools',
              component: Tools,
              meta:{
                label:"管理维护"
              },
            },
          ]
        },{
          path:'/switch',
          name: 'switch',
          redirect:'/switch/snoop',
          meta: {
            label:"交换设置",
            icon:"iconfont icon-shaixuan",
          },
          children:[
            {
              path:'snoop',
              name:'snoop',
              component:Snoop,
              meta:{
                label:"HDCP侦听"
              },
            }]
        },{
          path:'/qos',
          name: 'qos',
          redirect: '/qos/queue',
          meta: {
            label:"Qos策略",
            icon: "iconfont icon-diejia"
          },
          children: [
            {
              path:'queue',
              name:'queue',
              component:Queue,
              meta:{
                label:"QoS策略"
              },
            }
          ]
        },{
          path:'/visualization',
          name: 'visualization',
          redirect: '/visualization/globalMap',
          meta: {
            label:"可视化",
            icon:"iconfont icon-shezhizuobiao",
          },
          children: [
            {
              path:'globalMap',
              name:'globalMap',
              component: GlobalMap,
              meta:{
                label:"全局地图"
              },
            }
          ]
        }
      ]
    }
  ]
})
