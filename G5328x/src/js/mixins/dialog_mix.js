/** 混入：操作表单的方法，可访问被混入文件的内容 */
export default{

    data(){

    },

    methods: {
          
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
  
    },

    mounted(){
        
    }
}