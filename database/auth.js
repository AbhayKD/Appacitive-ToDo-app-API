const Appacitive = require('appacitive');
const promise = Appacitive.initialize({
    apikey: "MEk6aMTDtliwwwQvQgT7GXNS+Ak8P7FI6Q/pqYTpgVY=",
    env: "sandbox",
    appId: "168002687610258053"
});

function contractUserObject(userData) {
    let user = {};
    user.username = userData.username;
    user.password = userData.password;
    user.firstname = userData.firstname;
    return user
}

async function getUserLists(user) {
    var list = [];
    var query = user.getConnectedObjects({
        relation: 'owns', //mandatory
        returnEdge: false,
        label: 'lists', //mandatory
    });

    let queryResult = await query.fetch()
    for (let i = 0; i < queryResult.length; i++) {
        list[i] = queryResult[i].get("name")
    }   
    return list
}

module.exports = {
    createUser: async function (userData) {
        var userObject = contractUserObject(userData)
        try {
            let addResult = await Appacitive.Users.createUser(userObject)
            let userID = addResult.get('__id')
            return userID
        } catch (err) {
            console.log(err.message)
        }
    },
    loginUser: async function (loginData) {
        try {
            console.log(loginData.username, loginData.password)
            let loginResult = await Appacitive.Users.login(loginData.username, loginData.password)
            let userToken = loginResult.token
            let userLists = await getUserLists(loginResult.user)
            console.log(userLists)
            return (userToken +" User Lists: " + userLists)
        } catch (err) {
            console.log(err.message)
        }
    }
}