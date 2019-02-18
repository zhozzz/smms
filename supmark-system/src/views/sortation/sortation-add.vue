<template>
  <div id="sortation">
    <el-container>
      <el-header>添加分类</el-header>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" label-position="top">
        <el-form-item label="所属分类：">
          <el-select v-model="sizeForm.region" placeholder="--顶级分类--">
            <el-option label="食品" value="食品"></el-option>
            <el-option label="烟酒" value="烟酒"></el-option>
            <el-option label="日用品" value="日用品"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-input v-model="sizeForm.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="sizeForm.resource" size="small ">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import qs from 'qs';

export default {
  
  data() {
    return {
      sizeForm: {
        goodsname: "",
        region: "",
        resource: ""
      }
    };
  },
  methods: {
    /** 
     * 开始设置的分别存储在三个表中，能够读取数据在列表显示，但是操作不来在三个表中查找删除
     * 改为合并在一个表中，多加一个顶级分类的字段
    */
    onSubmit() {
      
      let params = {
          goodsname: this.sizeForm.goodsname,
          topclassify: this.sizeForm.region
        };

        console.log(params);

        this.axios
          .post('http://127.0.0.1:2333/sortation/commodity',qs.stringify(params))
          .then(response => {
            console.log(response.data);
            let { error_code,  reason } = response.data;
            if ( error_code===0) {
              this.$message({
                type:"success",
                message: reason

              })
               this.$router.push("/sortation-manage");
            }else {
              this.$message.error(reason)
            }
          })
          .catch(err => {
            console.log(err);
          });
      // console.log(this.sizeForm.region);


      // if (this.sizeForm.region === "foods") {
      //    let params = {
      //     goodsname: this.sizeForm.goodsname,
      //     topclassify: "食品"
      //   };
      //   this.axios
      //      .post('http://127.0.0.1:2333/sortation/commodity',qs.stringify(params))
      //     .then(response => {
      //       console.log(response.data);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // } else if (this.sizeForm.region === "tobawine") {
      //    let params = {
      //     goodsname: this.sizeForm.goodsname,
      //     topclassify: "烟酒"
      //   };
      //   this.axios
      //    .post('http://127.0.0.1:2333/sortation/commodity',qs.stringify(params))
      //     .then(response => {
      //       console.log(response.data);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // } else if (this.sizeForm.region === "commodity") {
      //   console.log(this.sizeForm.goodsname);

      //   let params = {
      //     goodsname: this.sizeForm.goodsname,
      //     topclassify: "日用品"
      //   };

      //   console.log(params);

      //   this.axios
      //     .post('http://127.0.0.1:2333/sortation/commodity',qs.stringify(params))
      //     .then(response => {
      //       console.log(response.data);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }


     
    }
  }
};
</script>


<style lang="less">
#sortation .el-input__inner {
  width: 210px;
  height: 40px;
  margin-left: 20px;
  font-size: 14px;
}
.el-radio-group {
  margin-left: 20px;
}
.el-form-item {
  margin: 20px 0;
}
#sortation .el-form {
  background-color: #fff;
  padding: 20px;
}
.el-form-item__label {
  font-size: 16px;
}
</style>