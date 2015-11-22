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
          posts.mensagem = 'Nao foi encontrada nenhuma publicacao.';
          res.render('forum', {user: req.user, 'posts': posts});
        } else {
          res.render('forum', {user: req.user, 'posts': posts.data});
        }
      }
    });
	});

  router.get('/new', app.locals.isLoggedIn, function(req, res) {
    res.render('new_forum', {user: req.user});
  });

  router.post('/new', function(req, res) {
    var post = new Post();
    post.title = req.body['title'];
    post.description = req.body['description'];
    if (req.body['permitir_comentarios']) 
      post.allowComments = true
    else
      post.allowComments = false

    post.user = req.user;

    PostController.insert(post, function(err, resposta) {
      if(err) throw err;
      if(resposta.success) {
        res.redirect('/forum');
      } else {
        var resp = {success: false, 'message': 'Ocorreu um erro ao fazer o post. Tente novamente mais tarde.'};
        res.json(resp);
      }
    });
  });

  router.get('/det/:id?', function(req, res){
    var id = req.params.id;
    if(id) {
      PostController.selectById(id, function(err, result) {
        if(err) throw err;
        if(!result.success) {
          result.mensagem = result.message;
          res.render('forum_details', {'post': result});
        } else {
          res.render('forum_details', {'post': result.data});
        }
      });
    } else {
      res.redirect('/forum');
    }
  });

  router.post('/comment/new', function(req, res) {
    var comment = new Comment();
    comment.content = req.body['comment'];
    comment.post = req.body['post'];

    CommentController.insert(comment, function(err, result) {
      if(err) throw err;
      if(result.success) {
        res.redirect('/forum/det/'+comment.post);
      }
    });
  });

	return router;
}

module.exports = exports = UserApp;
