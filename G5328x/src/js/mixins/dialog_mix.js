/** 混入：操作表单的方法，可访问被混入文件的内容 */
export default{

    data(){
      return{
        //弹窗对象
        dialogInfo:{
          show:false,
          type:"",
          title:"",
          handle:""
        }
      }
    },

    methods: {

        /* 表格处理函数 */
        customCompFunc(options){
          switch(options.type){
            case "selectAll": this.selectAll(options); break;
            case "checkbox":  this.selectOne(options); break;
            case "delete": this.deleteRows(options); break;
            case "edit": 
            case "add":
            this.editOrAddRows(options); break;
          }
        },
          
        /* 单行删除或批量删除 */
        deleteRows(options){
          this.dialogInfo.show = true;
          this.dialogInfo.type = "delete";
          this.dialogInfo.title = "";
          this.dialogInfo.handle = () =>{
                let postData = options.rowData || this.selectArr;
                this.post(this.pageUrl.del,postData,()=>{
                  this.initTable();
                  this.closeDialog();
                });
          };
        },
  
        /* 编辑、添加操作 */
        editOrAddRows(options){
          this.dialogInfo.show = true;
          this.dialogInfo.type = options.type;
          this.dialogInfo.title = options.type === "add"? "添加"+this.$route.meta.label: "编辑"+this.$route.meta.label;

          for(let key in options.rowData){
            this.formData[key] = options.rowData[key];
          }
          
          this.dialogInfo.handle = () =>{
                this.post(this.pageUrl.set,this.formData,()=>{
                  this.initTable();
                  this.closeDialog();
                })
          };
        },

        /* 关闭弹窗 */
        closeDialog(){
          this.dialogInfo.show = false;
          for(let i in this.formData){
            this.formData[i] = "";
          }
          if(this.dialogInfo.type == "delete"){
              this.selectArr.list = [];
          }
        },

        /**更新、初始化表格数据 */
        initTable(){
          this.get(this.pageUrl.get,(res)=>{
            this.tableData.originData = res.data.list;
          })
        },
  
    },

    mounted(){
        
    }
}