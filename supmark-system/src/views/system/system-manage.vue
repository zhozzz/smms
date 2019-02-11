<template>
  <el-container>
    <el-header>系统信息</el-header>
    <el-main>
      <el-alert show-icon type="info">
        商品总数：{{AllGoods}}。
        已经销售的总金额：{{SellGoods}} 元。
        库存商品总价：{{repertory}} 元。
      </el-alert>

      <el-alert show-icon type="info" :closable="false">
        <span style="color:#57a000">导入数据</span>
      </el-alert>

      <el-row :gutter="20">
        <!-- 左边卡片列表 -->
        <el-col :span="12">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <div>
                <el-table :data="saleData" stripe style="width: 100%">
                  <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                  <el-table-column prop="saleCount" label="销量"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
        </el-col>
        <!-- 右边卡片列表 -->
        <el-col :span="12">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货的商品</span>
              </div>
              <div>
                <el-table :data="stockoutData" style="width: 100%">
                  <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                  <el-table-column prop="inventory" label="库存"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small">入库</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      AllGoods: 5, //商品总数
      SellGoods: 890.0, //销售总价
      repertory: 1235.32, //库存
      saleData: [
        {
          goodsName: "无尽之刃",
          saleCount: 10
        },
        {
          goodsName: "幻影之舞",
          saleCount: 80
        },
        {
          goodsName: "狂战士胫甲",
          saleCount: 50
        },
        {
          goodsName: "末日铁拳",
          saleCount: 18
        },
        {
          goodsName: "黑百合",
          saleCount: 18
        }
      ],
      stockoutData: [
        {
          goodsName: "快乐风男",
          inventory: 2333
        },
        {
          goodsName: "火影劫",
          inventory: 2
        },
        {
          goodsName: "鬼畜妖姬",
          inventory: 666
        },
        {
          goodsName: "百分百胜率烬",
          inventory: 1
        }
      ]
    };
  }
};
</script>


<style lang="less">
.el-alert--info {
  color: #585b66;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  background-color: #dbe3ff;
  margin-bottom: 20px;
}
html body #app .el-container .el-main .el-header {
  background-color: #e4e7ed;
  color: #333;
  text-align: left;
  line-height: 60px;
  font-size: 20px;
  font-weight: 600;
}
html body #app .el-container .el-main .el-main {
  background-color: #fff;
}
.el-alert__icon.is-big {
  font-size: 16px;
}
.el-card__header {
  background-color: #e4e7ed;
  text-align: left;
  font-size: 16px;
  font-weight: 900;
}
</style>