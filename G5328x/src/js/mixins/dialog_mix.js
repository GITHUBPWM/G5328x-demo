/** 混入：操作表格的方法，可访问被混入文件的内容 */
export default{

    data(){
      return{
        //弹窗对象
        dialogInfo:{
          show:false,
          type:"",
          title:"",
          handle:"",
          cancel:"",
        }
      }
    },

    methods: {

        /* 表格处理函数 */
        customCompFunc(options){
          this.dialogInfo.show = true;
          var path = options.title ? options.title: this.$route.meta.label;
          this.dialogInfo.type  = options.type;
          switch(options.type){
            case "selectAll": 
              this.selectAll(options); 
              this.dialogInfo.show = false;
              break;
            case "checkbox":  
              this.dialogInfo.show = false;
              this.selectOne(options); 
              break;
            case "delete": 
              this.dialogInfo.title = "";
              this.deleteRows(options); 
              break;
            case "edit": 
              this.dialogInfo.title = "编辑"+path;
              this.edit(options);
              break;
            case "add":
              this.dialogInfo.title = "添加"+path;
              this.addRow(); 
              break;
          }
        },
          
        /* 表格：单行删除或批量删除 */
        deleteRows(options){
          this.dialogInfo.handle = () =>{
                let postData = options.rowData || this.selectArr;
                this.post(this.pageUrl.del,postData,()=>{
                  this.initTable();
                  this.closeDialog(options);
                });
          };
        },
  
        /* 表格：编辑、添加操作 */
        editOrAddRows(options){
          if(options.rowData){ 
            for(let key in options.rowData){
              this.formData[key] = options.rowData[key];
            }
          }

          

          // if(options.handle){ //如果有传回调函数就用，若无则证明是表格，直接用下面的
          //   this.dialogInfo.handle = options.handle;
          // } else{
          //   //表格数据的回调
          //   this.dialogInfo.handle = () =>{
          //     this.post(this.pageUrl.set,this.formData,()=>{
          //       this.initTable();
          //       this.closeDialog(options);
          //     })
          //   };
          // }

          // if(options.cancel){
          //   this.dialogInfo.cancel = options.cancel;
          // }else{
          //   this.closeDialog(options);
          // }
         
          
          
        },

       

        /* 关闭弹窗 */
        closeDialog(options){
          this.dialogInfo.show = false;
          if(options.cancle){
            options.cancle();
          }else{
            if(options.type == "add"){
              for(let i in this.formData){
                this.formData[i] = "";
              }
            }
            if(this.dialogInfo.type == "delete"){
                this.selectArr.list = [];
            }
          }
        },

        /**表格：更新、初始化表格数据 */
        initTable(){
          this.get(this.pageUrl.get,(res)=>{
            this.tableData.originData = res.data.list;
          })
        },
  
    },

    mounted(){
        
    }
}