// var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// const session=require('express-session');
// const dotenv=require('dotenv');//.env파일을 읽어서 process.env.로 만듭니다.
const logger = require('morgan');
// const bodyParser=require('body-parser'); //요청의 본문에 있는 데이터를 해석해서 req.body객체로 만들어주는 미들웨어 보통 폼 데이터나 AJAX요청의 데이터를 처리, 단 멀티파트(이미지, 동영상, 파일)데이터는 처리하지 못함 그 경우에는 multer모듈을 사용하면 됨
const nunjucks=require('nunjucks'); //퍼그 html 문법 변화에 적응하기 분에게 힘든분에게 적합한 템플릿 엔진 html문법을 그대로 사용, 자바스크립트 문법 사용 파이썬의 템플릿 엔진인  Twig와 문법이 상당히 유사


const { sequelize } = require('./models');
// const indexRouter = require('./routes');
// const usersRouter = require('./routes/users');
// const commentsRouter = require('./routes/comments');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// const constants = require("constants");

// dotenv.config();

var app = express();// 익스프레스 내부 http 모듈에 내장되어 있으므로 서버가

app.set('port',process.env.PORT || 3001);


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});//watch: true 이면 thml 파일이 변경 될 때 템플릿 엔진을 다시 렌더링


//sync메서드를 사용해 서버 실행시 mySQL과 연동
sequelize.sync({ force: false }) //true로 설정하면 서버 실행시마다 테이블을 재생성, table을 잘 못 만든 경우에 true로 설정하면 됨
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/comments', commentsRouter);

//위에서 실행 되기 때문에 위쪽에 두어야 한다
//app.use에 매개변수가 req, res, next인 함수를 넣으면 됩니다 이들웨어는 위에서 부터 아래로 순서대로 실행
//요청과 응답 사이에 특별한 기능을 추가할 수 있다
//next라는 세번째 매개변수를 사용했는데 다음 미들웨어로 넘어가는 함수  next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다
//app.use 의 첫번째 형태로 미들웨어만 있으므로 모든 요청에대해 다 실행

// app.use(
//
//     (req,res,next) => {
//       console.log('모든 요청에 다 실행');
//       next();
//     }
//
// );

// app.use(bodyParser.raw());
// app.use(bodyParser.text());

// app.set('port', process.env.POR || 3000);
// app.set('port', process.env.PORT || 3001);

app.use(logger('dev')); //'dev'외에도 cobinde, common, short, tiny등을 넣을 수 있습니다. 개발환경에서는 dev, 베포 환경에서는 combined
app.use(express.json());//json 형식의 데이터 전달 방식
app.use(express.urlencoded({ extended: false }));//주소 형식으로 데이터를 보내는 방식  {extended: false } 옵션이 false면 노드의 querystring 모듈을 사용하여 쿼리 스트링을 해석하고 true면 qs모듈을 사용하여 쿼리 스트링을 해석함 qs 모듈은 내장 모듈이 아니라 npm 패키지이면 querystring 모듈의 기능을 좀더 확장한 모듈
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //static미들웨어는 정적인 파일들을 제공하는 라우터 역할

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  // next(createError(404));
});

// error handler 에러처리 미들웨어 모든 매개변수를 사용하지 않더라도 매개변수가 반드시 네개여야 합니다
//err는 에러에 관한 정보가 담겨 있습니다
//에러 처리 미들웨어는 가장 아래에 위치하도록 함
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;//에러 메시지
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 
  res.status(err.status || 500); //http 상태 코드를 지정할 수 있습니다 기본값은 200(성공) 에러 처리 미들웨어를 직접 연결하지 않아도 기본적으로 익스프레스가 에러를 처리하긴 합니다만 실무에서는 집접 에러 처리 미들웨어
  res.render('error');
});


// app.get('/',(req,res) => {
//   res.send( 'Hello,Express');
// });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기');
});

module.exports = app;
