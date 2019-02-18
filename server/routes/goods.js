var express = require('express');
var router = express.Router();
const connection = require('./connect')

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
    // 设置响应头 解决跨域(目前最主流的方式)
    res.header('Access-Control-Allow-Origin', '*');
    next();
})
/* GET home page. */

//商品分类二级菜单
router.post('/getGoodsClass', function (req, res, next) {

    let {topclassify} = req.body
    console.log("接收的数据",topclassify);
    
    const sqlStr = `select goodsname from commodity where topclassify='${topclassify}'`;
    console.log(sqlStr);

    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
      let goodsname = data.map(v => v.goodsname);
        // const obj = data[0];
        // const objStr = JSON.stringify(obj);
        // const goodsname = JSON.parse(objStr);
        console.log("发送的数据",goodsname);
        res.send(goodsname);
    })
    //   res.send('goods');
});



//添加商品
router.post('/goodsadd', function (req, res) {
    let { goodsname,goodsCode,goodsClass,topClassify,price,Marketprice,purchasing,stockAdd,weight ,unit ,vipsell ,discounts,intro} = req.body

    // console.log(goodsname);
    const sqlStr = `insert into goods(goodsname,goodsCode,goodsClass,topClassify,price,Marketprice,purchasing,stockAdd,weight ,unit ,vipsell ,discounts,intro ,stockNum ,sellNum) 
    values('${goodsname}','${goodsCode}','${goodsClass}','${topClassify}','${price}','${Marketprice}','${purchasing}','${stockAdd}','${weight}','${unit}','${vipsell}','${discounts}','${intro}','0','0')`;

    console.log(sqlStr);
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        console.log("数据",data)
        if (data.affectedRows > 0) {
            res.send({ "error_code": 0, "reason": "添加商品成功" });
        } else {
            res.send({ "error_code": 1, "reason": "插入数据失败" });
        }
    })
    //   res.send('foods');
});

module.exports = router;
