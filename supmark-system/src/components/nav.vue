<template>
  <el-menu
    
    background-color="#2d3a4b"
    unique-opened
    active-text-color="rgb(64, 158, 255)"
    :default-active="this.$route.path"
    router
    open="8"
  >
    <p class="navTitle">华联超市管理系统</p>
    <div style="font-size:12px;text-align:right;margin-right:20px;color:#ccc">
       <span style="color:#fff">您好,</span> 
      <span class="username">{{username}}</span>
    
        <p>
        <span style="margin-right:5px;cursor:pointer" @click="manageIndex">管理首页 |</span>
        <span style="cursor:pointer" @click="outSystem">退出系统</span>
        </p>
    </div>
    <!-- 导航一 -->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document"></i>分类管理
      </template>
      <el-menu-item index="/sortation-manage">分类管理</el-menu-item>
      <el-menu-item index="/sortation-add">添加分类</el-menu-item>
    </el-submenu>
    <!-- 导航二 -->
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-goods"></i>商品管理
      </template>
      <el-menu-item index="/goods-manage">商品管理</el-menu-item>
      <el-menu-item index="/goods-add">添加商品</el-menu-item>
    </el-submenu>
    <!-- 导航三 -->
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-sold-out"></i>进货管理
      </template>
      <el-menu-item index="/stock-manage">库存管理</el-menu-item>
      <el-menu-item index="/stock-add">添加库存</el-menu-item>
    </el-submenu>
    <!-- 导航四 -->
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-star-on"></i>出货管理
      </template>
      <el-menu-item index="/sell-list">销售列表</el-menu-item>
      <el-menu-item index="/stock-out">商品出库</el-menu-item>
      <el-menu-item index="/return-goods">商品退货</el-menu-item>
    </el-submenu>
    <!-- 导航五 -->
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-date"></i>统计管理
      </template>
      <el-menu-item index="/sell-sta">销售统计</el-menu-item>
      <el-menu-item index="/stock-sta">进货统计</el-menu-item>
    </el-submenu>
    <!-- 导航六 -->
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-menu"></i>账号管理
      </template>
      <el-menu-item index="/account-manage">账号管理</el-menu-item>
      <el-menu-item index="/account-add">添加账号</el-menu-item>
      <el-menu-item index="/pwd-mod">密码修改</el-menu-item>
    </el-submenu>

    <!-- 导航七 -->
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-info"></i>会员管理
      </template>
      <el-menu-item index="/member-manage">账号管理</el-menu-item>
      <el-menu-item index="/member-add">添加账号</el-menu-item>
    </el-submenu>
    <!-- 导航八 -->
    <el-submenu index="8">
      <template slot="title">
        <i class="el-icon-setting"></i>系统管理
      </template>
      <el-menu-item index="/">系统信息</el-menu-item>
      <el-menu-item index="/privlege-manage">权限管理</el-menu-item>
      <el-menu-item index="/system-config">系统配置</el-menu-item>
      <el-menu-item index="/add-group">添加管理组</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
    data() {
        return {
            username:window.localStorage.getItem('username')
        }
    },
    methods: {
        outSystem(){
          window.localStorage.setItem('token',"")
          this.$message({
              type: "success",
              message: "已退出账号，返回登陆页面"
            });
             this.$router.push("/login");
        },
        manageIndex(){
             this.$router.push("/");

        }
    },
};
</script>
<style lang="less">
.el-menu {
    color: #fff;

  height: 100%;
  border: none;
  .navTitle {
    color: #fff;
    font-size: 16px;
  }
  .el-submenu {
    .el-submenu__title {
      height: 46px;

      color: #fff;
    }
  }
  .el-menu-item {
    height: 40px;
    color: #fff;
  }
}

</style>
