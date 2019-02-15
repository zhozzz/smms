<template>
<div id='account'>
      <el-header>账号管理</el-header>
   <el-table
    :data="userDataList"
    style="width: 100%">
    <el-table-column
    prop="username"
      label="用户名称"
     >
      
    </el-table-column>
    <el-table-column
    prop="usergroup"
      label="用户组"
      >
      
    </el-table-column>
     <el-table-column
   
      label="创建时间"
      >
    <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>

    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

</template>
<script>
import qs from 'qs';
import moment from "moment";

export default {
    data() {
        return {
            userDataList:[{
                username:"",
                usergroup:"",
                ctime:"",
                id:""
            }]
        }
    },
    created() {
      this.getUserList()
    },
    filters:{
       filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    methods: {
      getUserList(){
        this.axios.get('http://127.0.0.1:2333/account/accountList')
      .then(response=>{
          this.userDataList=response.data
      })
      .catch(err=>{
        console.log(err);
        
      })
      },
      handleEdit(row) {
        console.log(row);
      },
      handleDelete(id) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            this.axios.get(`http://127.0.0.1:2333/account/accountDel?id=${id}`)
            .then(response=>{
              let { error_code, reason } = response.data;
                if (error_code===0) {
                  this.$message({
                      type: "success",
                      message: reason
                    });

                  this.getUserList()
                }else {
                  this.$message.error(reason);
                }

            })
            .catch(err=>{
              console.log(err);
              
            })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });

          // console.log(id);
        
      }
    }
    
 
}
</script>


<style lang="less">


</style>