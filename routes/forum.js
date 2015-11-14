var express = require('express');
var Post = require('../model/post');
var Comment = require('../model/comment');
var PostController = require('../controller/post');
var CommentController = require('../controller/comment');
var router = express.Router();

function UserApp(app){
	/* GET users listing. */
	router.get('/', app.locals.isLoggedIn, function(req, res) {
    PostController.selectAll(function(err, posts) {
      if(posts.success) {
        if(!posts.data) {
          posts.mensagem = 'Nao foi encontrado nenhuma publicacao.';
          res.render('forum', {user: req.user, 'posts': posts});
        } else {
          res.render('forum', {user: req.user, 'posts': posts});
        }
      }
    });
	});

  router.get('/new', app.locals.isLoggedIn, function(req, res) {
    res.render('new_forum', {user: req.user});
  });

  router.post('/new', app.locals.isLoggedIn, function(req, res) {
    var post = new Post();
    post.title = req.body['title'];
    post.description = req.body['description'];
    post.allowComments = req.body['allowComments'];

    PostController.insert(post, function(err, resposta) {
      if(err) throw err;
      if(resposta.success) {
        // Responde com um json. Prevista submissao ajax...
        res.json(resposta);
      } else {
        var resp = {success: false, 'message': 'Ocorreu um erro ao fazer o post. Tente novamente mais tarde.'};
        res.json(resp);
      }
    });
  });

	return router;
}


module.exports = exports = UserApp;
