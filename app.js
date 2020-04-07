

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();





// add this sql code
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'sqlroot',
  database:'simple-react-sql'
});

//заголовок CORS 
app.use(function(req, res, next) { // req - объекту запроса.  объекту ответа (res)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next(); // Следующая функция промежуточной обработки
});


connection.connect(function(err){
  (err)?console.log(err+'+++++++++/////'):
  console.log('connection******');
});




/*
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();
*/


/*
app.get('/', function(req, res) {
  res.send('hello world');
  console.log('Hello from backend');
});
*/
require('./routes/html-routes')(app, connection);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); // отображение html
});



module.exports = app;
