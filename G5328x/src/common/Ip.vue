<template>
  <div class="ip-div" ref="ipBox" :class="{'err-box':err}"> 
    <div v-for="i in 4" :key="i" style="display:inline">
      <input :ref="'ip'+i" type="text" v-model="ipArr[i-1]" @keyup="keyup(i)" maxlength="3" @change="changeIp"><span v-if="i!==4">.</span>
    </div>
    <div v-if="err" class="input-err">{{err}}</div>
  </div>
</template>
<script>
export default {
  props:["ip"],
  model:{
    prop:'ip',
  },
  data(){
    return{
      ipArr:{ 0:"",1:"", 2:"",3:""},
      err:""
    }
  },

  computed:{
    //這樣才能被watch监听到新旧值的不同，不然直接监听对象新旧值会是一样的，but why:猜：
    //直接监听对象监听的是地址，里面的内容变化获取不到，而这样每次都是新返回的一个对象，就像在监听一个普通变量的变化一样，所以能取到新旧值
    ipStr() {
      return JSON.parse(JSON.stringify(this.ipArr));
    }
  },

  watch:{
    ipStr:{
      handler(newVal,oldVal){
        this.err ="";
        let numReg = new RegExp("^[0-9]*$"); 
        for(let i in newVal){ 
          //不能输入非数字 , 0-255之间 
          if(!numReg.test(newVal[i])){
            this.ipArr[i] = oldVal[i]
          } else if(newVal[i]>255 || newVal[i] == "00" || newVal[i] == "000"){
            this.err = "请输入一个有效的ip地址";
          }
        }
      },
      deep:true
    } ,
  },

  methods:{

    keyup(index){
      //左右键
      if(window.event.keyCode === 39 || window.event.keyCode === 37){
        index =  window.event.keyCode === 39? index+1 : index-1;
        if(index>0 && index <5){
           this.$refs["ip"+index][0].focus();
        }
      }else{
        if((this.ipArr[index-1]+"").length==3 && index<4){
         this.$refs["ip"+(index+1)][0].focus();
         this.$refs["ip"+(index+1)][0].select()
        }
      }
    },

    changeIp(){
      this.$emit("input",this.ipArr[0]+'.'+this.ipArr[1]+'.'+this.ipArr[2]+'.'+this.ipArr[3]);
    }
  },




  mounted(){
    if(this.ip){
      for(let i=0; i < this.ip.split(".").length;i++){
        this.ipArr[i] = this.ip.split(".")[i];
      }
    }

    // //鼠标点出ip输入框时，进行其他数据验证
    // document.addEventListener("click",(e)=>{
    //   if(!(this.$refs.ipBox.contains(e.target))){
    //     if(!this.isValid){

    //     }
    //   }

    // })
  }
  
}
</script>
<style scoped lang="less">
  .ip-div{
    box-sizing: border-box;
    height: 30px;
    width: 190px;
    border: 1px solid rgb(223, 223, 223);
    padding-left: 10px;
    padding-right: 10px;

    input{
      height: 100%;
      width: 35px;
      border: none;
      text-align: center;
    }
  }
  .err-box{
    border-color:red
  }
  .input-err{
    color: red;
    font-size: 14px;
  }
</style>