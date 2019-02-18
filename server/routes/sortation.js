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
//根据顶级分类放入不同分类表
//食品
// router.post('/foods', function (req, res) {
//     let { goodsname,topclassify } = req.body

//     console.log(goodsname);
//     const sqlStr = `insert into foods(goodsname,topclassify) values('${goodsname}','${topclassify}')`;
//     console.log(sqlStr);
//     connection.query(sqlStr, (err, data) => {
//         if (err) throw err;
//         // console.log("数据",data)
//         if (data.affectedRows > 0) {
//             res.send({ "error_code": 0, "reason": "插入数据成功" });
//         } else {
//             res.send({ "error_code": 1, "reason": "插入数据失败" });
//         }
//     })
//     //   res.send('foods');
// });


//烟酒
// router.post('/tobawine', function (req, res) {
//     let { goodsname,topclassify } = req.body

//     console.log(goodsname);
//     const sqlStr = `insert into tobawine(goodsname,topclassify) values('${goodsname}','${topclassify}')`;
//     console.log(sqlStr);
//     connection.query(sqlStr, (err, data) => {
//         if (err) throw err;
//         // console.log("数据",data)
//         if (data.affectedRows > 0) {
//             res.send({ "error_code": 0, "reason": "插入数据成功" });
//         } else {
//             res.send({ "error_code": 1, "reason": "插入数据失败" });
//         }
//     })
//     //   res.send('foods');
// });


//日用品
//更改后合并在一个表内
router.post('/commodity', function (req, res) {
    let { goodsname, topclassify } = req.body

    console.log(goodsname);
    const sqlStr = `insert into commodity(goodsname,topclassify) values('${goodsname}','${topclassify}')`;
    // console.log(sqlStr);
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // console.log("数据",data)


        if (data.affectedRows > 0) {
            res.send({ "error_code": 0, "reason": "添加分类成功" });
        } else {
            res.send({ "error_code": 1, "reason": "插入数据失败" });
        }
    })
    //   res.send('foods');
});


//获取数据
router.get('/sortationList', function (req, res) {
    // const sqlStr = 'select * from commodity union select * from tobawine union select * from foods';
    // const sqlStr = 'select * from commodity'
    // // 执行sql语句
    // connection.query(sqlStr, (err, data) => {
    //     if (err) throw err;
    //     // 把查询到的数据响应给前端
    //     console.log(data);

    //     res.send(data);
    // })
    
    let { pageSize,currentPage}=req.query;
  // 默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;

  let sqlStr = 'select * from commodity';

  connection.query(sqlStr, (err, data) => {
    if(err) throw err;
    let total=data.length;
    let n= (currentPage - 1) * pageSize;
    sqlStr += ` limit ${n}, ${pageSize}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
    //   console.log(data);
      res.send({
        total,
        data
      })
    })

 
   })


});


//删除
router.post('/sortationDel', (req, res) => {
    //获取传入的id
    let { id, topclassify } = req.body;

    const sqlStr = `delete from commodity where id = ${id}`;
    console.log(sqlStr);


    connection.query(sqlStr, (err, data) => {
        if (err) throw err;

        if (data.affectedRows > 0) {
            console.log("删除成功");


            res.send({ "error_code": 0, "reason": "删除数据成功" });
        } else {

            res.send({ "error_code": 1, "reason": "删除数据失败" });
        }
    })

})

//修改
router.post('/sortationEdit', (req, res) => {
    let { goodsname, topclassify, id } = req.body;
    // console.log("保存的修改内容", goodsname, topclassify, id);
    const sqlStr = `update commodity set goodsname='${goodsname}',topclassify='${topclassify}' where id=${id}`;
    // console.log(sqlStr);
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        console.log("数据", data);

        if (data.affectedRows > 0) {
            // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象

            console.log(1);

            res.send({ "error_code": 0, "reason": "修改数据成功" });
        } else {
            // 失败：返回给前端失败的数据对象
            console.log(2);

            res.send({ "error_code": 1, "reason": "修改数据失败" });
        }
    })

})

//批量删除
router.get('/batchDelete',(req,res)=>{

    let { selectedId } = req.query;
  
   
    const sqlStr = `delete from commodity where id in (${selectedId})`;
  
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // 把查询到的数据响应给前端
      if (data.affectedRows > 0) { 
        console.log("删除成功");
        
        // 如果受影响行数大于0 删除成功 返回成功的数据对象给前端
        res.send({"error_code": 0, "reason":"删除数据成功"});
      } else {
        // 否则删除失败 返回失败的数据对象给前端
        res.send({"error_code": 1, "reason":"删除数据失败"});
      }
    })
  })

module.exports = router;
