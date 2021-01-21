import axios from 'axios';
import Vue from 'vue';

axios.defaults.baseURL = "http://192.168.98.17:3010/mock/124";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**封装post，get请求，为全局方法 */
export default{
  install(){
    Vue.prototype.post = function(url,data,callback){
      axios.post("/goform/"+url, data).then(callback);
    }
    
    Vue.prototype.get = function(){
      if(typeof(arguments[1]) == "function"){
        axios.get("/goform/"+arguments[0]).then(arguments[1]);
      }else{
        axios.get("/goform/"+arguments[0],arguments[1]).then(arguments[2]);
      }
    }
  }

} 
 
