<template>
  <div id="account">
    <el-container>
      <el-header>添加账号</el-header>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理组">
            <el-select v-model="ruleForm2.usergroup" placeholder="管理组">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="高级管理员" value="高级管理员"></el-option>
            </el-select>
          </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import qs from 'qs';

export default {
  data() {
    
    const checkSpecificKey = str => {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false;
        }
      }
      return true;
    };
    // var checkId = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("账号不能为空"));
    //   } else if (value.length < 3 || value.length > 6) {
    //     callback(new Error("长度在 3 - 6 位"));
    //   } else {
    //     callback();
    //   }
    // };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("不能包含特殊字符"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        password: "",
        checkPass: "",
        username: "",
        usergroup:""
        
      },
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
            { required: true, message: '请选择用户组', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          
          let params = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.password,
            usergroup: this.ruleForm2.usergroup,
          };
          // console.log(params);
          this.axios.post('http://127.0.0.1:2333/account/accountadd', qs.stringify(params))
          .then(response=>{
              // console.log(response.data);
              let { error_code,  reason } = response.data;
            if ( error_code===0) {
              this.$message({
                type:"success",
                message: reason

              })
            }else {
              this.$message.error(reason)
            }
             
          })
          .catch(err=>{
            console.log(err)
          })

          this.$router.push("/account-manage");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style lang="less">
.el-input__inner {
  width: 300px;
}
.el-form-item {
  margin: 20px 0;
}
.el-button--primary {
    color:#000;
    background-color: #fff;
    border-color: #fff;
}
</style>