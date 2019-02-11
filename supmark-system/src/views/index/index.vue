<template>
  <el-container>
    <el-aside width="200px">
      <Nav></Nav>
    </el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main>
     
        <router-view/>
      </el-main>
      <el-footer><Bottom></Bottom></el-footer>
    </el-container>
  </el-container>
</template>
<script>
import Nav from "@/components/nav.vue";
import Header from "@/components/header.vue";
import Bottom from "@/components/bottom.vue";

export default {
    components:{
        Nav,
        Header,
        Bottom
    }
};
</script>

<style lang="less">
html {
  height: 100%;

  body {
    height: 100%;
    margin: 0;
#app {
  .el-container {
   
    .el-header,
    .el-footer {
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }

    .el-aside {
      background-color: #d3dce6;
      color: #333;
      text-align: center;
      // line-height: 200px;
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
    }
  }
}
  }
}

</style>


