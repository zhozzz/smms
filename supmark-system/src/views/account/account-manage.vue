<template>
  <div id="account-manage">
    <el-header>账号管理</el-header>
    <el-table
      :data="userDataList"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="usergroup" label="用户组"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 20px; text-align: left;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <!-- 全选反选 -->
    <div style="margin-top: 20px">
      <el-button @click="batchDelete()">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑账号" :visible.sync="dialogFormVisible">
      <el-form :model="editUserData" :rules="rules2">
        <el-form-item label="账号名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editUserData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理组" :label-width="formLabelWidth" prop="usergroup">
          <el-select v-model="editUserData.usergroup" placeholder="请选择管理组">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="高级管理组" value="高级管理组"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import moment from "moment";

export default {
  data() {
    return {
      userDataList: [
        {
          username: "",
          usergroup: "",
          ctime: "",
          id: ""
        }
      ],
      editUserData: { username: "", usergroup: "", id: "" },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules2: {
        username: [
          // { validator: checkId, trigger: "blur" },
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "账号长度在 2 - 6 位",
            trigger: "blur"
          }
        ],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      },
      multipleSelection: [],
      currentPage: 1,
      total: 0,
      pageSize: 3
    };
  },
  created() {
    this.getUserList();
  },
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    //获取全部列表信息
    getUserList() {
      // this.axios
      //   .get("http://127.0.0.1:2333/account/accountList")
      //   .then(response => {
      //     this.userDataList = response.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      //升级版
      let pageSize=this.pageSize
      let currentPage=this.currentPage
      this.axios.get("http://127.0.0.1:2333/account/accountList",
        {params: {
            pageSize,
            currentPage
        }})

          .then(response => {
          console.log('对应页码的数据:', response.data)
           let {total, data} = response.data;
          // 赋值给对应的变量即可
            this.total = total;
          
            this.userDataList = data;
              if ( !data.length && this.currentPage !== 1) {
            
              this.currentPage -= 1;
              
              this.getUserList();
            }
        
          })
          .catch(err => {
            console.log(err);
          });


      },

    //点击修改
    handleEdit(row) {
      // console.log(row);
      // this.editUserData=row;
      let { username, usergroup, id } = row;
      // console.log(username,usergroup,id);
      this.editUserData.username = username;
      this.editUserData.usergroup = usergroup;
      this.editUserData.id = id;

      // console.log(this.editUserData);
      this.dialogFormVisible = true;
    },

    //保存修改
    saveEdit() {
      this.axios
        .post(
          "http://127.0.0.1:2333/account/accountSaveEdit",
          qs.stringify(this.editUserData)
        )
        .then(response => {
          console.log(response.data);
          let { error_code, reason } = response.data;
          if (error_code === 0) {
            // 弹出成功的提示
            this.$message({
              type: "success",
              message: reason
            });
            // 刷新列表（重新请求所有账号数据）
            this.getUserList();
          } else {
            // 弹出失败的提示
            this.$message.error(reason);
          }

          this.dialogFormVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:2333/account/accountDel?id=${id}`)
            .then(response => {
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });

                this.getUserList();
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // console.log(id);
    },
    // 取消选中
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //选中状态改变
    handleSelectionChange(val) {
      console.log(val);

      this.multipleSelection = val;
    },
    batchDelete() {
      let selectedId = this.multipleSelection.map(v => v.id);

      if (!selectedId.length) {
        this.$message({
          message: "未选中账号",
          type: "warning"
        });
        return;
        console.log(1);
      }
      console.log(selectedId);
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(
              `http://127.0.0.1:2333/account/batchDelete?selectedId=${selectedId}`
            )
            .then(response => {
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });

                this.getUserList();
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    
    handleSizeChange(val) {
     console.log(val);
     
      this.pageSize = val;
      
      this.getUserList();
    },
 
    handleCurrentChange(val) {
     
      this.currentPage = val;
     
      this.getUserList();
    }





  }
};
</script>


<style lang="less">
</style>