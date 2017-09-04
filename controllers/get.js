const restify = require('restify');
const db = require('../database/get');

module.exports = {
    getItem: async function(req,res,next){
        let list = JSON.parse(req.body);    
        let getResult = await db.getItem(req.body)
        res.send(getResult)
    }

};