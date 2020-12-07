import Dialog from "../common/Dialog";
import Vue from 'vue'


var my_plugins = function(){
    Vue.component("my-dialog",Dialog);
}
export default my_plugins;