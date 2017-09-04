const restify = require('restify');
const db = require('../database/auth');

module.exports = {
    createUser: async function(req,res,next){
        //console.log(req.body);
        let userDetailsJson = req.body;
        let result = await db.createUser(userDetailsJson);
        res.send("User ID is: " + result)
    },
    login: async function(req,res,next){
        let loginDetailsJson = req.body;
        //console.log(req.headers)
        let result = await db.loginUser(loginDetailsJson);
        res.send("Auth Token is: " + result)
    },
    addList: async function(req,res,next){
        console.log(req.headers.authtoken)
    }

};