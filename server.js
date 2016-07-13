'use strict';
var http = require('http');
var port = 8080;
var returnDate = require("./return")
var returnUnix = require("./returnUnix")
var isUnix = true;
var server = http.createServer();

server.on('request', function(req, res){
  var url = req.url;
  var query = require('url').parse(url, true);
  var path = query.path;
  var output = path.substring(1, path.length).replace(/%20/g, "");
  
  for(var i in output){
    if(output.charCodeAt(i) > 57){
      isUnix = false;
    }
  }
  
  console.log(isUnix);
  if(isUnix){
    res.write(JSON.stringify(returnUnix(output))); 
    res.end();
    
  }else{
    res.write(JSON.stringify(returnDate(output))); 
    res.end();
    isUnix = true;
  }
});

server.listen(8080);





