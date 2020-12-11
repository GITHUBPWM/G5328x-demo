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
    },
    /* table行里的操作按钮 */
    operateBts:"",

  },
  mutations:{
    setActiveRect(state,res){
      state.thirdActiveLeft = res.left +"px";
      state.thirdActiveWidth = res.width +"px";
    },

    /* 给每行的按钮组件传值，显示具体哪些按钮（编辑、删除等） */
    setOperateBts(state, res) {
      state.operateBts = res;
    }

    
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
