var express = require('express');
var router = express.Router();


const connection = require('./connect')

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

//添加
router.post('/accountadd',(req,res)=>{
    let {username ,password,usergroup}=req.body;

    console.log('接收到前端发送过来的数据：', username, password, usergroup);
    const sqlStr=`insert into account(username, password, usergroup) values('${username}', '${password}', '${usergroup}')`;
    // console.log(sqlStr);
    
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        console.log("数据",data);
        
        if (data.affectedRows > 0) {  
            // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象

            // console.log(1);
            
            res.send({"error_code": 0, "reason":"插入数据成功"});
          } else {
            // 失败：返回给前端失败的数据对象
            // console.log(2);
            
            res.send({"error_code": 1, "reason":"插入数据失败"});
          }
        
        // res.send({"error_code": 0, "reason":"插入数据成功"});
       
    })


})

//获取用户列表
router.get('/accountList',(req,res)=>{
  // const sqlStr = 'select * from account';
  // // 执行sql语句
  // connection.query(sqlStr, (err, data) => {
  //   if (err) throw err;
  //   // 把查询到的数据响应给前端
  //   res.send(data);
  // })

  let { pageSize,currentPage}=req.query;
  // 默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;

  let sqlStr = 'select * from account';

  connection.query(sqlStr, (err, data) => {
    if(err) throw err;
    let total=data.length;
    let n= (currentPage - 1) * pageSize;
    sqlStr += ` limit ${n}, ${pageSize}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send({
        total,
        data
      })
    })

 
   })


})

//删除
router.get('/accountDel',(req,res)=>{
  //获取传入的id
  let { id } = req.query;

  const sqlStr = `delete from account where id = ${id}`;
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


//保存修改
router.post('/accountSaveEdit',(req,res)=>{
  let {username ,usergroup ,id}=req.body;
  console.log("保存的修改内容",username ,usergroup ,id);
  const sqlStr=`update account set username='${username}',usergroup='${usergroup}' where id=${id}`
  console.log(sqlStr);
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    console.log("数据",data);
    
    if (data.affectedRows > 0) {  
        // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象

        console.log(1);
        
        res.send({"error_code": 0, "reason":"修改数据成功"});
      } else {
        // 失败：返回给前端失败的数据对象
        console.log(2);
        
        res.send({"error_code": 1, "reason":"修改数据失败"});
      }
    
   
   
})
  // res.send("1")
})


//批量删除
router.get('/batchDelete',(req,res)=>{

  let { selectedId } = req.query;

 
  const sqlStr = `delete from account where id in (${selectedId})`;

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
