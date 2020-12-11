
// 我这种形式的公共弹框组件要求了传过来的数据都是统一的格式才行，应该用插槽更好，分离数据与容器

export default{

    data(){

    },

    methods: {
        deleteRows(options){
            //TODO:不能直接改变dialogCfg这个state的状态
              this.dialogCfg.show = true;
              this.dialogCfg.title = "";
              this.dialogCfg.type = "confirm";
              console.log(this.tableData.originData)
              this.dialogCfg.handle = () =>{
                    //单行删除或批量删除
                    let postData = options.rowData || this.selectArr;
                    this.$axios.post("/goform/"+options.dataUrl.del,postData).then(()=>{
                        this.$axios.get("/goform/"+options.dataUrl.get).then((res)=>{
                            this.tableData.originData = res.data.list;
                        });
                        this.dialogCfg.show = false;
                        this.selectArr.list = [];
                    });
              };
          },
  
        /* 编辑、添加操作 */
        editOrAddRows(options){
            this.dialogCfg.show = true;
            this.dialogCfg.type = options.type;
            this.dialogCfg.title = options.type === "add"? "添加"+this.$route.meta.label: "编辑"+this.$route.meta.label;
            this.dialogCfg.defaultData = options.rowData || this.formData;
            this.dialogCfg.operateForm = this.getOperateForm(this.tableData.columns) ;
            this.dialogCfg.handle = () =>{
                  this.$axios.post("/goform/"+options.dataUrl.set,this.dialogCfg.defaultData).then(()=>{
                      this.$axios.get("/goform/"+options.dataUrl.get).then((res)=>{
                          this.tableData.originData = res.data.list;
                      });
                      this.dialogCfg.show = false;
                  });
            };
          },
  

        /* 生成操作表单(弹框里的内容) */ 
        getOperateForm(columns){
            let operateForm = [];
            for(let i=0,len=columns.length; i < len; i++){
              if(columns[i].title == "操作"){
                continue;
              }
              operateForm.push(columns[i]);
            }
            return operateForm;  
          }
  
    },

    mounted(){
        
    }
}