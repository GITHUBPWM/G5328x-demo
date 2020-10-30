import myVue from "../main";
const widtha=0;


export  default {

  /*获取重定位过来的父路由的子路由集合*/
   getMenuTabs:function(router,route){
     if(route.redirectedFrom){
       let parentRoute = router.options.routes[0].children.filter((item) => {
         return  route.redirectedFrom.includes(item.path);
       })[0];
       //循环层层父路由，直到父路由为直接父路由（上一级路由）
       while (parentRoute.path !== route.redirectedFrom){
         parentRoute =  parentRoute.children.filter((item)=>{
           return route.redirectedFrom === item.path;
         })[0];
       }
       return parentRoute.children;
     }
  },

  /*获取当前选中路由的下划线div的宽度和位置，实现点击路由左右滑动效果*/
  getActiveRect: function(document,that){
    if(document.querySelector(".router-link-exact-active")){
      new Promise((resolve, reject)=>{
        that.$nextTick(()=>{
          let width = document.querySelector(".router-link-exact-active").getBoundingClientRect().width;
          let boxLeft =  document.querySelector(".third-title-box").getBoundingClientRect().left;
          let left = document.querySelector(".router-link-exact-active").getBoundingClientRect().left-boxLeft;
          resolve({width:width, left:left});
        })
      }).then((res)=>{
        that.$store.dispatch('getActiveRect', res).then();
      })
    }

  }



}



