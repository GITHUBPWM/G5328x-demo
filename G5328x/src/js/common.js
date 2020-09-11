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

  getActiveRect: function(document,that){
    if(document.querySelector(".router-link-exact-active")){

        that.$nextTick(()=>{
          let width = parseInt(document.querySelector(".router-link-exact-active").getBoundingClientRect().width);
          let boxLeft =  parseInt(document.querySelector(".third-title-box").getBoundingClientRect().left);
          let left = parseInt(document.querySelector(".router-link-exact-active").getBoundingClientRect().left)-boxLeft;

        })


    }
  }



}



