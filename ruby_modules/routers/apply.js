/**
 * Created by ruby on 2014/9/24.
 */
var express=require('express');
var router=express.Router();
router.use(function(req,res){
    res.render("apply.ejs",{options:["首页","产品介绍页","帮助中心"]});
})
exports.router=router;