var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT | 3000;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var signedCookieParser = cookieParser('zhufengchat');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieSignature = require('cookie-signature');
var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
    url: 'mongodb://123.57.143.189/zhufengchat'
})
var routes = require('./routes/index');
var users = require('./routes/users');
var port = process.env.PORT | 3000;
app.use(express.static(path.join(__dirname,'app')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'zhufengchat',
    resave:true,
    saveUninitialized:false,
    cookie: {
        maxAge: 60 * 1000 * 60
    },
    store: sessionStore
}))
app.use('/', routes);
app.use('/users', users);


app.use(function(req, res, next) {
    console.error('404',req.url);
    res.end('404');
});

app.use(function(err, req, res, next) {
    console.error(err);
    res.end('500');
});

var server = app.listen(port);

var messages = [];

var io = require('socket.io').listen(server);
/*io.set('authorization', function(request, next) {
    signedCookieParser(request,{},function(err){//解密cookie
        sessionStore.get(request.signedCookies['connect.sid'],function(err,session){//从session中获取会话信息
            if (err) {
                next(err.message, false)
            } else {
                if (session && session._userId) {
                    request.session = session;
                    next(null, true)
                } else {
                    next('未登陆')
                }
            }
        });
    });
});*/
io.sockets.on('connection',function(socket){
    socket.emit('connected');
    socket.on('createMessage',function(message){
        messages.push(message);
        io.sockets.emit('message.add',message);
    });
    socket.on('getAllMessages',function(){
        socket.emit('allMessages',messages);
    });
});