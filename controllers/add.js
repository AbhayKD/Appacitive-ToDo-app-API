const restify = require('restify');
const db = require('../database/add');

module.exports = {
    addList: async function (req, res, next) {
        let authToken = req.headers.authtoken,
            listName = req.body.name
        let addResult = await db.addList(authToken, listName)
        res.send(addResult.get("name") + " created at: " + addResult.get("__utcdatecreated"))
    },
    addItem: async function (req, res, next) {
        let listID = req.body.id,
            itemTitle = req.body.title,
            itemStatus = req.body.status

        let addResult = await db.addItem(listID, itemTitle, itemStatus)
        res.send(addResult.get("title") + " created at: " + addResult.get("__utcdatecreated"))
    },
    toggleStatus: async function (req, res, next) {
        let statusUpdateResult = await db.toggleStatus(req)
        res.send(statusUpdateResult)
    },
    updateItem: async function(req, res, next){
        let itemUpdateResult = await db.updateItem(req.body)
        res.send(itemUpdateResult)
    }
};