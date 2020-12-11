import Dialog from "../common/Dialog";
import Help from "../views/help/Help"
import Vue from 'vue'


var my_plugins = function(){
    /* 全局注册的组件  */ 
    Vue.component("my-dialog",Dialog);
    // Vue.component("my-help",Help);
}
export default my_plugins;