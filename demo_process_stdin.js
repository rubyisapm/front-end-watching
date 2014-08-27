process.stdin.resume();  
process.stdin.setEncoding('utf8');  
  
process.stdin.on('data', function (chunk) {  
  process.stdout.write('data: ' + chunk);  
}); 

process.stdin.on('end', function () {  
  process.stdout.write('end');
}); 
/*这个可以在cmd中直接运行，输入值后按回车，程序会输出您输入的值*/