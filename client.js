const restify = require('restify-plugins');
var client = restify.createJsonClient({
    url : 'http://localhost:3000'
  });
  
  client.post('/foo', {bar : 'bar'}, function (err, req, res, obj) {
      if(err){
          console.log(err.message);
      }
  });