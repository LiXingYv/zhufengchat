var db = require('../models');
var async = require('async');
var encryUtils = require('../utils/encryUtils');

//验证用户登陆
exports.findById = function(userId,callback){
    db.User.findOne({_id:userId},function(err,user){
        if(err)
            callback(err);
        else
            callback(null,user);
    })
};

/**
 * 用户注册
 */
exports.reg = function(user,callback){
    new db.User(user).save(function(err,user){
        if(err)
            callback(err);
        else
            callback(null,user);
    })
};


/**
 * 用户登录
 */
exports.login = function(user,cb){
    db.User.findOne({username:user.username,password:encryUtils.encrypt(user.password)},function(err,findUser){
        if(err)
            cb(err);
        else{
            cb(null,findUser);
        }
    });
};
