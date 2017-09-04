const restify = require('restify');
const db = require('../database/delete');

module.exports = {
    deleteItem: async function(req,res,next){    
        let getResult = await db.deleteItem(req.params.id)
        res.send(getResult.code)
    },
    deleteList: async function(req,res,next){
        let getResult = await db.deleteList(req.params.id)
        res.send(getResult.code)
    }

};