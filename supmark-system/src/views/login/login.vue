<template>
  <div id="login">
    <div id="login-wapper">
      <p class="title">
        <i class="el-icon-document"></i>
        华联超市管理系统-登录
      </p>

      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="idnum">
          <el-input type="text" v-model="ruleForm2.idnum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        idnum: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        idnum: [
          { required: true, message: "请输入账号", trigger: "blur" },

          { min: 2, max: 6, message: "账号长度在 2 - 6 位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('登录成功!');
          let params = {
            username: this.ruleForm2.idnum,
            password: this.ruleForm2.pass
          };

          this.axios.post(
            "http://127.0.0.1:2333/account/login",
            qs.stringify(params)
          ) 
          .then(response => {
          // console.log(response.data);
          let { error_code, reason,token} = response.data;
          if (error_code === 0) {
            // 弹出成功的提示
             window.localStorage.setItem('token', token);
             window.localStorage.setItem('username', params.username);
            this.$message({
              type: "success",
              message: reason
            });
          //  console.log(token);
           
            this.$router.push("/");
          } else {
            // 弹出失败的提示
            this.$message.error(reason);
          }

        })
        .catch(err => {
          console.log(err);
        });;

         
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
html {
  height: 100%;
  width: 100%;
  body {
    height: 100%;
    width: 100%;
    #app {
      height: 100%;

      #login {
        height: 100%;
        width: 100%;
        background-color: #2d3a4b;
        #login-wapper {
          width: 500px;
          height: 350px;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.2);
          color: #ffffff;
          text-align: center;
          // 垂直水平居中
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          padding: 30px 50px 0 10px;
          .title {
            font-size: 20px;

            margin-bottom: 20px;
          }
         
        }
      }
    }
  }
}
</style>
