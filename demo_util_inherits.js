var util=require("util");
var Base=function(){
	this.name="ruby";
}
Base.prototype={
	set:function(age){
		this.age=age;
	},
	speak:function(content){
		console.log("speaking:"+content);
	}
}
var Sub=function(){
	this.sex="girl";
}
util.inherits(Sub,Base);
var sub=new Sub();
console.log(sub);//girl
sub.speak("speaking");//speak:speaking