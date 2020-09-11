import Vue from 'vue'
import Router from 'vue-router'

import Summary from "../views/commonFunc/Summary.vue";
import Tools from "../views/commonFunc/Tools.vue";
import QVlan from "../views/commonFunc/vlan/QVlan.vue";
import Member from "../views/commonFunc/vlan/Member.vue";
import GlobalMap from "../views/visualization/GlobalMap.vue";
import DeviceList from "../views/visualization/GlobalMap.vue";
import Snoop from "../views/switch/Snoop.vue";
import Instance from "../views/switch/tree/Instance.vue";
import Global from "../views/switch/tree/Global.vue";
import Queue from "../views/qos/Queue.vue"
import QosIndex from "../views/qos/QosIndex.vue"
import DSCP from "../views/qos/DSCP.vue"
import Index from "../views/Index.vue";
import ThirdMenu from "../common/ThirdMenu";
import PageIndex from "../common/PageIndex";

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
          component: PageIndex,
          redirect:'/commonFunc/summary',
          meta:{
            label:"常用功能",
            icon:"iconfont icon-fangzi"
          },
          children:[
            {
              path:'/commonFunc/summary',
              name:'summary',
              component: Summary,
              meta:{
                label:"系统概览"
              },
            },{
              path:'/commonFunc/tools',
              name:'tools',
              component: Tools,
              meta:{
                label:"管理维护"
              },
            },{
              path:'/commonFunc/vlan',
              name:'vlan',
              component: ThirdMenu,
              redirect: '/commonFunc/vlan/qvlan',
              meta:{
                label:"VLAN划分"
              },
              children: [{
                path:'qvlan',
                name: 'qvlan',
                component: QVlan,
                meta: {
                  label: '802.1Q VLAN'
                }
              },{
                path:'member',
                name: 'member',
                component: Member,
                meta: {
                  label: '端口成员'
                }
              }]
            },
          ]
        },{
          path:'/switch',
          name: 'switch',
          component: PageIndex,
          redirect:'/switch/snoop',
          meta: {
            label:"交换设置",
            icon:"iconfont icon-shaixuan",
          },
          children:[
            {
              path:'/switch/snoop',
              name:'snoop',
              component:Snoop,
              meta:{
                label:"HDCP侦听"
              }
            },{
              path:'/switch/tree',
              name:'tree',
              component:ThirdMenu,
              redirect:'/switch/tree/global',
              meta:{
                label:"生成树"
              },
              children:[{
                path:'global',
                name:'global',
                component:Global,
                meta:{
                  label:'全局设置'
                }
              },{
                path:'instance',
                name:'instance',
                component:Instance,
                meta:{
                  label:'实例信息'
                }
              },]
            },]
        },{
          path:'/qos',
          name: 'qos',
          redirect: '/qos/queue',
          component:QosIndex,
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
                label:"QoS调度"
              },
            }, {
              path:'dscp',
              name:'dscp',
              component:DSCP,
              meta:{
                label:"DSCP"
              },
            }
          ]
        },{
          path:'/visualization',
          name: 'visualization',
          redirect: '/visualization/globalMap',
          component: PageIndex,
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
            } ,{
              path:'deviceList',
              name:'deviceList',
              component: DeviceList,
              meta:{
                label:"设备列表"
              },
            }
          ]
        }
      ]
    }
  ]
})
