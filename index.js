const restify = require('restify');
const auth = require('./controllers/auth');
const add = require('./controllers/add');
const get = require('./controllers/get');
const delet = require('./controllers/delete');

var server = restify.createServer({
    name: "API_app",
    version: "0.0.1"
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

/* server.get('/user',function(req,res,next){
    res.send('hello ' + req.body); 
    next();
}); */

server.put('/signup', auth.createUser);
server.post('/login', auth.login);
server.put('/addlist', add.addList);
server.put('/additem', add.addItem);
server.post('/togglestatus',add.toggleStatus);
server.get('/getitem',get.getItem);
server.del('/deletelist/:id',delet.deleteList)
server.del('/deleteitem/:id',delet.deleteItem)
server.post('/updateitem',add.updateItem)


server.listen(3000,function(){
    console.log('%s listening at %s', server.name, server.url);
});
