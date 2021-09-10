var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var JwtUilt = require('./models/jwt.js')
// 初始化统一响应机制
var resextra = require('./models/resextra')
var indexRouter = require('./routes/index');

var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Content-Length,Authorization,Accept')
  // res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method.toLowerCase() == 'options') {
    res.send(200)
  } else {
    next()
  }
})


app.use(resextra)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  // 我这里只是把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
  if (req.url != '/users/login' && req.url != '/users/register') {
    let token = req.headers.authorization
    let jwt = new JwtUilt(token)
    let result = jwt.verifyToken()
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
      console.log(result)
      res.send({ status: 403, msg: '登录已过期,请重新登录' })
      // res.render('login.html');
    } else {
      next()
    }
  } else {
    next()
  }
})

// app.use('/', indexRouter);
indexRouter(app)

module.exports = app;
