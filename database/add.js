const Appacitive = require('appacitive');
const promise = Appacitive.initialize({
    apikey: "MEk6aMTDtliwwwQvQgT7GXNS+Ak8P7FI6Q/pqYTpgVY=",
    env: "sandbox",
    appId: "168002687610258053"
});

async function batchUpdate(updateObjects) {
    var itemObject = Appacitive.Object.extend('items')
    var batchUpdateObject = new Appacitive.Batch()
    for (let i = 0; i < updateObjects.length; i++) {
        let itemID = updateObjects[i].id,
            status = updateObjects[i].status
        var item = new itemObject({ id: itemID })
        item.set('status', status)
        batchUpdateObject.add(item)
    };

    try {
        let batchUpdateResult = await batchUpdateObject.execute()
        console.log("Status updated", batchUpdateResult)
    } catch (err) {
        console.log(err.message)
    }
}

async function listUserConnection(authToken, listID) {
    var connection = Appacitive.Connection.extend('owns');
    let user = await Appacitive.User.getUserByToken(authToken),
        userID = user.get("__id")
    console.log(userID)
    var owner = new connection({
        endpoints: [{
            objectid: userID,
            label: "user"
        }, {
            objectid: listID,
            label: "lists"
        }]
    });
    try {
        let saveConnection = await owner.save()
    } catch (err) {
        console.log(err.message)
    }
}

async function itemListConnection(listID, itemID) {
    var connection = Appacitive.Connection.extend('contains_items');
    console.log(listID, itemID)
    var containsItem = new connection({
        endpoints: [{
            objectid: listID,
            label: "lists"
        }, {
            objectid: itemID,
            label: "items"
        }]
    });
    try {
        let saveConnection = await containsItem.save()
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    addList: async function (authToken, listName) {
        //var userObject = contractUserObject(userData)
        var listObject = Appacitive.Object.extend('lists');
        var list = new listObject({ name: listName })
        try {
            if (list.isNew()) console.log("Creating item");
            else return ("List name already exists! Try again")
            let addResult = await list.save()
            console.log("List created");
            let connectionResult = await listUserConnection(authToken, addResult.get("__id"))
            return addResult
        } catch (err) {
            console.log(err.message)
        }
    },
    addItem: async function (listID, itemTitle, itemStatus) {
        var itemObject = Appacitive.Object.extend('items');
        var item = new itemObject({ title: itemTitle, status: itemStatus })
        try {
            let addResult = await item.save()
            console.log("Item created");
            console.log("Item ID" + addResult.get("__id"))
            let connectionResult = await itemListConnection(listID, addResult.get("__id"))
            return addResult
        } catch (err) {
            console.log(err.message)
        }
    },
    toggleStatus: async function (req) {
        console.log(req.body)
        let getResult = await batchUpdate(req.body)
        return getResult
    },
    updateItem: async function(req){
        let itemID = req.id,
            itemTitle = req.title,
            itemStatus = req.status
        let itemObject = Appacitive.Object.extend('items')
            itemToUpdate = new itemObject({__id: itemID})
        
        itemToUpdate.set('title', itemTitle)
        itemToUpdate.set('status', itemStatus)
        try {
            let itemUpdateResult = await itemToUpdate.save()
            return itemUpdateResult
        } catch (err) {
            console.log(err.message)
        }
    }
}