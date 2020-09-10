import myVue from "../main";
const widtha=0;


export  default {

  widtha,

  /*获取重定位过来的父路由的子路由集合*/
   getMenuTabs:function(router,route){
    if(route.redirectedFrom){
      return  router.options.routes[0].children.filter((item) => {
        return item.path === route.redirectedFrom;
      })[0].children;
    }
  },

  /*获取当前选中路由的下划线div的宽度和位置，实现点击路由左右滑动效果*/
  getActiveRect(document,that){
    let boxLeft,left;

    if(document.querySelector(".router-link-exact-active")){

        that.$nextTick(()=>{
          console.log(document.querySelector(".router-link-exact-active").getBoundingClientRect().width)
          this.widtha = document.querySelector(".router-link-exact-active").getBoundingClientRect().width;
          // boxLeft = document.querySelector(".third-title-box").getBoundingClientRect().left;
          // left =  document.querySelector(".router-link-exact-active").getBoundingClientRect().left-boxLeft+"px";
// r如果放这里return，那边是获取不到的
        })
      //这里又会先输出
      return 222
    }
  }



}



