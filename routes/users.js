var express = require('express');
var router = express.Router();
var User = require('../controllers/user');
var encryUtils = require('../utils/encryUtils');
var crypto = require('crypto');

/**
 * 验证用户是否已经登录
 */
router.get('/validate', function(req, res) {
  var userId = req.session.userId;
  if(userId){
    User.findById(userId,function(err,user){
      if(err){
        res.json(500, {msg: err});
      }else{
        res.json(user);
      }
    });
  }else{
    res.status(500).json({msg: 'err'});
  }
});
/**
 * 注册用户
 */
router.post('/reg', function(req, res) {
  var md5 = crypto.createHash('md5'),
      emailMd5 = md5.update(req.body.email.toLowerCase()).digest('hex');
  var avatar = "https://secure.gravatar.com/avatar/"+emailMd5+"?s=48";
  User.reg({username:req.body.username,password:encryUtils.encrypt(req.body.password),avatar:avatar,email:req.body.email},function(err,user){
    if(err){
      res.json(500, {msg: err});
    }else{
      req.session.userId = user._id;
      res.json(user);
    }
  });
});

/**
 * 用户登陆
 */
router.post('/login', function(req, res) {
  User.login(req.body,function(err,user){
    if(err){
      res.json(500, {msg: err});
    }else{
      req.session.userId = user._id;
      res.json(user);
    }
  });
});

/**
 * 用户退出
 */
router.get('/logout', function(req, res) {
  req.session.userId = null;
  res.json({msg:'success'});
});

module.exports = router;
