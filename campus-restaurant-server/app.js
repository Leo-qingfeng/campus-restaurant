var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/campus-restaurant');
mongoose.set('useFindAndModify', false)
// 路由
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var isLoginRouter = require('./routes/isLogin');
var getUserInfoRouter = require('./routes/getUserInfo');
var updateUserInfoRouter = require('./routes/updateUserInfo');
var updatePassword = require('./routes/updatePassword');
var addDishRouter = require('./routes/addDish');
var getDishRouter = require('./routes/getDish');
var deleteDishRouter = require('./routes/deleteDishes')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getUsersRouter = require('./routes/getUsers');
var addBanlanceRouter = require('./routes/addBanlance');
var addOrderRouter = require('./routes/addOrder')
var getOrderListsRouter =require('./routes/getOrderLists')
var getAllOrderListsRouter =require('./routes/getAllOrderLists')
var updateOrderStatusRouter =require('./routes/updateOrderStatus')
var uploadPicRouter  =require('./routes/uploadPic')
var getWeekDataRouter = require('./routes//getWeekData')
var app = express();
app.use(session({
  secret: 'capmus-restaurant',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10 * 100
  }
}))

// view engine setup
// 连接服务器
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("服务器连接成功！")
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use('/myUpload',express.static(path.join(__dirname, 'myUpload')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurant/login', loginRouter)
app.use('/restaurant/register', registerRouter);
app.use('/restaurant/islogin', isLoginRouter)
app.use('/restaurant/logout', logoutRouter)
app.use('/restaurant/getuserinfo', getUserInfoRouter);
app.use('/restaurant/updateUserInfo', updateUserInfoRouter);
app.use('/restaurant/updatePassword', updatePassword);
app.use('/restaurant/addDishes', addDishRouter);
app.use('/restaurant/getDishes', getDishRouter);
app.use('/restaurant/deleteDishes', deleteDishRouter);
app.use('/restaurant/getUsers', getUsersRouter);
app.use('/restaurant/addBanlance', addBanlanceRouter);
app.use('/restaurant/addOrder', addOrderRouter);
app.use('/restaurant/getOrderLists', getOrderListsRouter);
app.use('/restaurant/getAllOrderLists', getAllOrderListsRouter);
app.use('/restaurant/updateOrderStatus', updateOrderStatusRouter);
app.use('/restaurant/uploadPic', uploadPicRouter);
app.use('/restaurant/getWeekData', getWeekDataRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log("服务启动成功，请进入")
  console.log("http://localhost:3000")
})

module.exports = app;
