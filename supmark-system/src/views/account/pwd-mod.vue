<template>
  <div id="passworld">
    <el-container>
      <el-header>添加账号</el-header>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="password">
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="text" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkNewPass">
          <el-input type="text" v-model="ruleForm.checkNewPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import qs from "qs";

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
    //查询原密码
    var validatePass0 = (rule, value, callback) => {
      let username = { username: window.localStorage.getItem("username") };
      // console.log(username);

      this.axios
        .post("http://127.0.0.1:2333/account/selectPwd", qs.stringify(username))
        .then(response => {
          // console.log(response.data);
          let checkPwd = response.data.password;
          //   console.log(checkPwd);
          if (value === "") {
            callback(new Error("请输入密码"));
          } else if (value !== checkPwd) {
            callback(new Error("请输入正确的密码"));
          } else {
            if (this.ruleForm.newPassword !== "") {
              this.$refs.ruleForm.validateField("newPassword");
            }
            callback();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("不能包含特殊字符"));
      } else if (value === this.ruleForm.password) {
        callback(new Error("请勿与原密码一致!"));
      } else {
        if (this.ruleForm.checkNewPass !== "") {
          this.$refs.ruleForm.validateField("checkNewPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        newPassword: "",
        checkNewPass: ""
      },

      rules: {
        password: [{ validator: validatePass0, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkNewPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let username = window.localStorage.getItem("username");

          let params = {
            password: this.ruleForm.newPassword,
            username: username
          };
          //   console.log(params);
          this.axios
            .post(
              "http://127.0.0.1:2333/account/changepwd",
              qs.stringify(params)
            )
            .then(response => {
              //   console.log(response.data);
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                window.localStorage.setItem("token", "");
                this.$router.push("/login");
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
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
#passworld .demo-ruleForm {
  background-color: #fff;
  .el-form-item {
    margin: 20px 0;
    .el-input__inner {
      width: 300px;
    }
  }
}
</style>