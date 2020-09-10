import myVue from "../main";
const widtha=0;


export  default {

  /*获取重定位过来的父路由的子路由集合*/
   getMenuTabs:function(router,route){
    if(route.redirectedFrom){
      return  router.options.routes[0].children.filter((item) => {
        return item.path === route.redirectedFrom;
      })[0].children;
    }
  },



}



