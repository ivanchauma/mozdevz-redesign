// Modulos da aplicacao...
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    fs = require('fs');

// Variavel representacional da aplicacao
var app = express();

app.locals.dbURL = require('./config/db').url;
app.locals.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.session.redirrect_to = req.originalUrl;
    res.redirect('/login');
};

// ======= Configuracoes da aplicacao ======== //
app.set('port', process.env.PORT || 3000); // Porta http onde estara disponivel a app
// Configuracoes das views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Descomentar a linha seguinte se existir favicon no directorio /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev')); // Gestor de logs de erro na consola

// Parse dos corpos dos http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10 }));

// Adiciona suporte a verbos PUT e DELETE do HTTP
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cookieParser()); // Manipulacao dos cookies nos requests

app.use(express.static(path.join(__dirname, 'public'))); // Directorio de ficheiros estaticos
// Controlo de sessoes na app
app.use(expressSession({
  secret: 'moz forum app00', 
  saveUninitialized: false, 
  resave: true, 
  cookie:{_expires : app.locals.tempoMaximoSessao*60*1000
 }
}));

// Flash message para express
app.use(flash());


// Rotas da aplicacao
var root = require('./routes/index')(app);
var users = require('./routes/users')(app);
var profile = require('./routes/profile')(app);

app.use('/', root);
app.use('/users', users);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var db = mongoose.connection;

db.on('error', function(){
  console.log('Erro ao connectar-se com a BD: '+app.locals.dbURL);
  process.exit(1);
});

db.once('open', function(){
  console.log('Connectado com sucesso a BD: '+app.locals.dbURL);
  app.listen(app.get('port'), function(){
    console.log('Aplicacao iniciada na porta '+app.get('port'));
  });
});

// Conexao com a Base de Dados
var options = {
  server: {
    socketOptions: {
     keepAlive: 1, 
     connectTimeoutMS: 30000 
   } 
  }, 

  replset: {
    socketOptions: { 
      keepAlive: 1, 
      connectTimeoutMS : 30000 
    } 
  } 
};

mongoose.connect(app.locals.dbURL, options);
