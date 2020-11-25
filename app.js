const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// mongoose
mongoose
  .connect('mongodb://localhost:27017', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// app
const app = express();

// session
const sessionConfig = { 
  secret: '343ji43j4n3jn4jk3n',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection
  })
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sessionConfig.cookie.secure = true
}
app.use(session(sessionConfig))

// view engine setup (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static content
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js/bootstrap/', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/css/bootstrap/', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js/jquery/', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const loginRouter = require('./routes/login');
app.use('/', loginRouter);
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const signUpRouter = require('./routes/signup');
app.use('/', signUpRouter);

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
  res.render('error');
});

module.exports = app;
