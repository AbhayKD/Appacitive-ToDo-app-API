const Appacitive = require('appacitive');
const promise = Appacitive.initialize({
    apikey: "MEk6aMTDtliwwwQvQgT7GXNS+Ak8P7FI6Q/pqYTpgVY=",
    env: "sandbox",
    appId: "168002687610258053"
});

/* function contractUserObject(userData){
    let user = {};
    user.username = userData.username;
    user.password = userData.password;
    user.firstname = userData.firstname;
    return user
}
 */
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

async function getListItems(listObj) {
    var items = [];
    var listObject = new Appacitive.Object.extend('lists');
    var list = new listObject({__id: listObj.id});
    var query = list.getConnectedObjects({
        relation: 'contains_items', //mandatory
        returnEdge: false,
        label: 'items', //mandatory
    });

    let queryResult = await query.fetch()
    for (let i = 0; i < queryResult.length; i++) {
        items[i] = queryResult[i].get("title")
    }   
    return items
}

module.exports = {
    getItem: async function (list) {
        try {
            let listItems = await getListItems(list)
            console.log(listItems)
            return (list.id +" List Items: " + listItems)
        } catch (err) {
            console.log(err.message)
        }
    }
}