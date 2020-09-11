import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    thirdTitles:[],
    thirdActiveLeft:0,
    thirdActiveWidth:0,
  },
  mutations:{
    setActiveRect(state,res){
      state.thirdActiveLeft = res.left +"px";
      state.thirdActiveWidth = res.width +"px";
    }
  },
  actions:{

    /*获取当前选中路由的下划线div的宽度和位置，实现点击路由左右滑动效果*/
    getActiveRect(context,select){
      if(document.querySelector(".router-link-exact-active")){
        new Promise((resolve,reject)=>{
          select.that.$nextTick(()=>{
            let width = parseInt(document.querySelector(".router-link-exact-active").getBoundingClientRect().width);
            let boxLeft =  parseInt(document.querySelector(".third-title-box").getBoundingClientRect().left);
            let left = parseInt(document.querySelector(".router-link-exact-active").getBoundingClientRect().left)-boxLeft;
            resolve({width:width,left:left});
          })
        }).then((res)=>{
          context.commit('setActiveRect',res);
        });

      }
    },


    getWLL(context,select){
      console.log(select);
    }


  },
  modules:{

  }

});

export default store;
