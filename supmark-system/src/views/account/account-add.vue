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
        <el-form-item label="账号" prop="idnum">
          <el-input v-model.number="ruleForm2.idnum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item >
            <el-dropdown split-button type="primary" trigger="click">添加管理组
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>普通管理员</el-dropdown-item>
                <el-dropdown-item>高级管理员</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
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
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("账号不能包含特殊字符"));
      } else {
        callback();
      }
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
          { validator: checkId, trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "账号长度在 2 - 6 位,且包含字母开头",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("登录成功!");
          let params = {
            username: this.ruleForm2.idnum,
            password: this.ruleForm2.pass
          };
          // console.log(params);

          this.$router.push("/");
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