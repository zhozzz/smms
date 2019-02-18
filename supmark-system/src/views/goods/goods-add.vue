<template>
  <div id="goods-add">
    <el-container>
      <el-header>添加账号</el-header>
      <el-form
        label-position="top"
        ref="form"
        :model="form"
        label-width="120px"
        status-icon
        :rules="rules"
      >
        <el-form-item label="商品分类:" prop="goodsClassArr" >
          <el-cascader
            :options="options2"
            @active-item-change="handleItemChange"
            :props="props"
            :show-all-levels="false"
           v-model="form.goodsClassArr"
           id="classcascader"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称:" prop="goodsname">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品编码：" prop="goodsCode">
          <el-input v-model="form.goodsCode"></el-input>
        <el-button type="success" @click="setGoodsCode">生成商品编码</el-button>
        </el-form-item>
        <el-form-item label="商品售价：" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价：">
          <el-input v-model="form.Marketprice"></el-input>
        </el-form-item>

        <el-form-item label="商城进价：">
          <el-input v-model="form.purchasing"></el-input>
        </el-form-item>

        <el-form-item label="入库数量：">
          <el-input v-model="form.stockAdd "></el-input>
        </el-form-item>

        <el-form-item label="商品重量：">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="商品单位：">
          <el-input v-model="form.unit"></el-input>
        </el-form-item>
        <el-form-item label="会员优惠：">
          <el-radio-group v-model="form.vipsell">
            <el-radio label="享受"></el-radio>
            <el-radio label="不享受"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否促销：">
          <el-radio-group v-model="form.discounts">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品简介：">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>


 
<script>
import qs from "qs";

export default {
  data() {
    return {
      
      form: {
        goodsCode:"",
        goodsClassArr: [""],
        goodsClass:"",
        topClassify:"",
        goodsname: "",
        price: "",
        Marketprice: "",
        purchasing: "",
        stockAdd: "",
        weight: "",
        unit: "",
        vipsell: "",
        discounts: "",
        intro: ""
      },
     
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        goodsclass: [{ required: true, message: "请选中商品分类", trigger: "blur" }],
        goodsCode: [{ required: true, message: "请生成商品编码", trigger: "blur" }],
      },
      options2: [
        {
          label: "食品",
          classname: []
        },
        {
          label: "烟酒",
          classname: []
        },
        {
          label: "日用品",
          classname: []
        }
      ],
      props: {
        value: "label",
        children: "classname"
      }
    };
  },

  methods: {
    onSubmit() {
      this.form.goodsClass=this.form.goodsClassArr[1],
      this.form.topClassify=this.form.goodsClassArr[0],
      
      console.log(this.form);
      this.axios.post('http://127.0.0.1:2333/goods/goodsadd',qs.stringify(this.form))
      .then(response=>{
        console.log(response.data);
        let { error_code,  reason } = response.data;
            if ( error_code===0) {
              this.$message({
                type:"success",
                message: reason
              })
              this.$router.push("/goods-manage");
            }else {
              this.$message.error(reason)
            }
        
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
   
    //二级菜单数据
    handleItemChange(val) {
      // console.log("active item:", val);

      setTimeout(_ => {
        if (val.indexOf("食品") > -1 && !this.options2[0].classname.length) {
          let params = {
            topclassify: "食品"
          };
          this.axios
            .post(
              "http://127.0.0.1:2333/goods/getGoodsClass",
              qs.stringify(params)
            )
            .then(response => {
              const classNameArr = response.data;
              console.log("数组:", classNameArr);

              const rstArr = [];

              classNameArr.map(v => {
                var newObj = {};
                newObj.label = v;
                rstArr.push(newObj);
              });
              this.options2[0].classname = rstArr;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (
          val.indexOf("烟酒") > -1 &&
          !this.options2[1].classname.length
        ) {
          let params = {
            topclassify: "烟酒"
          };
          this.axios
            .post(
              "http://127.0.0.1:2333/goods/getGoodsClass",
              qs.stringify(params)
            )
            .then(response => {
              const classNameArr = response.data;
              console.log("数组:", classNameArr);

              const rstArr = [];

              classNameArr.map(v => {
                var newObj = {};
                newObj.label = v;
                rstArr.push(newObj);
              });
              this.options2[1].classname = rstArr;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (
          val.indexOf("日用品") > -1 &&
          !this.options2[2].classname.length
        ) {
          let params = {
            topclassify: "日用品"
          };
          this.axios
            .post(
              "http://127.0.0.1:2333/goods/getGoodsClass",
              qs.stringify(params)
            )
            .then(response => {
              const classNameArr = response.data;
              console.log("数组:", classNameArr);

              const rstArr = [];

              classNameArr.map(v => {
                var newObj = {};
                newObj.label = v;
                rstArr.push(newObj);
              });
              this.options2[2].classname = rstArr;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 300);

    },

    //生成商品编码
    setGoodsCode(){
        console.log(1);
        
    }

    


  }
};
</script>


<style lang="less">
#goods-add {
  .el-form {
    background-color: #fff;
    padding: 20px;
    .el-form-item {
      margin: 20px 0;
      .el-input {
        line-height: 30px;
        .el-input__inner {
          width: 120px;
          margin-left: 20px;
          height: 30px;
          line-height: 30px;
        }
      }
      .el-button--success{
          margin-left: 20px;

      }
      .el-cascader {
        .el-input__inner {
          width: 150px;
        }
        .el-cascader__label {
          left: 25px;
        }
      }
      .el-form-item__label {
        font-size: 16px;
        padding: 0;
      }
    }
    .el-button--primary {
      color: #000;
      background-color: #fff;
      border-color: #fff;
    }
  }
}
</style>