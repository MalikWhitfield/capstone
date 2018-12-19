var expressSession = require("express-session");
var mongoStore = require("connect-mongodb-session")(expressSession);

var store = new mongoStore({
    uri: "mongodb://hobbyshare1:hobbyshare1@ds131763.mlab.com:31763/hobbyshare",
    collection: "Sessions"
});

store.on("error", function (err) {
    console.log("[SESSION ERROR]", err);
});

// @ts-ignore
var session = expressSession({
    secret: "you should change this", //CHANGE ME!!!!
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
    },
    store,
    resave: true,
    saveUninitialized: true
});

module.exports = session;