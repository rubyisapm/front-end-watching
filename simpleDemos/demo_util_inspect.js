var util=require("util");
var Person=function(){
	this.name="ruby";
	this.toString=function(){
		console.log(this.name);
	}
}
var person=new Person();
console.log(util.inspect(person));
console.log(util.inspect(person,true));