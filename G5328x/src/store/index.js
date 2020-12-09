import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    thirdTitles:[],
    thirdActiveLeft:0,
    thirdActiveWidth:0,
    /* 弹框参数 */
    dialogCfg:{
      show:false,
      title:"",
      type:"confirm",
      handle:"",
      opareteForm:[],
      defaultData:{}
    }
  },
  mutations:{
    setActiveRect(state,res){
      state.thirdActiveLeft = res.left +"px";
      state.thirdActiveWidth = res.width +"px";
    },

    
  },
  actions:{

    /*获取当前选中路由的下划线div的宽度和位置，实现点击路由左右滑动效果*/
    getActiveRect(context,select){
          context.commit('setActiveRect',select);
    },

  },
  modules:{

  }

});

export default store;
