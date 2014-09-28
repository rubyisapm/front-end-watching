/**
 * Created by ruby on 2014/9/24.
 */
var express=require('express');
var router=express.Router();
router.use(function(req,res){
    res.render('submit.ejs');
})
exports.router=router;