<template>
  <div id="sortation-manage">
    <el-container>
      <el-header>添加分类</el-header>
      <el-table
        :data="classlist"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="goodsname" label="分类名称"></el-table-column>
        <el-table-column prop="topclassify" label="所属顶级分类"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id,scope.row.topclassify)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <!-- 分页 -->
    <div style="margin-top: 20px; text-align: left;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 全选反选 -->
    <div style="margin-top: 20px">
      <el-button @click="batchDelete()">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>

    <!-- 编辑弹框 -->
    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
      <el-form :model="editclassData">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="goodsname">
          <el-input v-model="editclassData.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理组" :label-width="formLabelWidth" prop="topclassify">
          <el-select v-model="editclassData.topclassify" placeholder="--请选择顶级分类--">
            <el-option label="食品" value="食品"></el-option>
            <el-option label="烟酒" value="烟酒"></el-option>
            <el-option label="日用品" value="日用品"></el-option>
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

export default {
  data() {
    return {
      //获取的数据
      classlist: [
        {
          id: "",
          goodsname: "",
          topclassify: ""
        }
      ],
      //保存修改数据
      editclassData: { id: "", goodsname: "", topclassify: "" },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      multipleSelection: [],
      currentPage: 1,
      total: 0,
      pageSize: 3
    };
  },
  created() {
    this.getclassList();
  },
  methods: {
    //获取数据库数据
    getclassList() {
      // this.axios
      //   .get("http://127.0.0.1:2333/sortation/sortationList")
      //   .then(response => {
      //     // console.log(response.data);
      //     this.classlist = response.data;
      //     // console.log(this.classlist);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      //升级版
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      this.axios
        .get("http://127.0.0.1:2333/sortation/sortationList", {
          params: {
            pageSize,
            currentPage
          }
        })

        .then(response => {
          // console.log('对应页码的数据:', response.data)
          let { total, data } = response.data;

          this.total = total;

          this.classlist = data;
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;

            this.getclassList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //选中状态更改
    handleSelectionChange(val) {
      console.log(val);

      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    //删除
    handleDelete(id, topclassify) {
      console.log(id, topclassify);
      let params = {
        id: id,
        topclassify: topclassify
      };
      console.log(params);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post(
              "http://127.0.0.1:2333/sortation/sortationDel",
              qs.stringify(params)
            )
            .then(response => {
              let { error_code, reason } = response.data;
              console.log(error_code, reason);

              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });

                this.getclassList();
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

    //修改
    handleEdit(row) {
      // console.log(row);
      // this.editclassData=row;
      let { goodsname, topclassify, id } = row;

      this.editclassData.goodsname = goodsname;
      this.editclassData.topclassify = topclassify;
      this.editclassData.id = id;
      // console.log(this.editclassData);

      this.dialogFormVisible = true;
    },

    //保存修改
    saveEdit() {
      console.log(this.editclassData);

      this.axios
        .post(
          "http://127.0.0.1:2333/sortation/sortationEdit",
          qs.stringify(this.editclassData)
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

            this.getclassList();
          } else {
            this.$message.error(reason);
          }

          this.dialogFormVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

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
      // console.log(val);

      this.multipleSelection = val;
    },

    //批量删除
    batchDelete() {
      let selectedId = this.multipleSelection.map(v => v.id);

      if (!selectedId.length) {
        this.$message({
          message: "未选中账号",
          type: "warning"
        });
        return;
        // console.log(1);
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
              `http://127.0.0.1:2333/sortation/batchDelete?selectedId=${selectedId}`
            )
            .then(response => {
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });

                this.getclassList();
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

      this.getclassList();
    },

    handleCurrentChange(val) {
      this.currentPage = val;

      this.getclassList();
    }
  }
};
</script>


<style lang="less">
</style>