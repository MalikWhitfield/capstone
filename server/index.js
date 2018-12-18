var express = require('express')
var bp = require('body-parser')
var server = express()
var cors = require('cors')
var port = 9001

// server.use(express.static(__dirname + ))

var whitelist = ["http://localhost:8080"]
var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
server.use(cors(corsOptions))

//FIRE UP DATABASE CONNECTION
require('./db/mlab-config')

//REGISTER MIDDLEWEAR
server.use(bp.json())
server.use(bp.urlencoded({
    extended: true
}))


//AUTH ROUTES
let auth = require('../server/auth/routes')
server.use(auth.session)
server.use(auth.router)


//Gate Keeper Must login to access any route below this code
server.use((req, res, next) => {
    if (!req.session.uid) {
        return res.status(401).send({
            error: 'Please login to continue'
        })
    }
    next()
})


// ALL ROUTES BELOW
let postRoutes = require('../server/routes/post-route')
server.use('/api/posts', postRoutes)

let commentRoutes = require('../server/routes/comment-route')
server.use('/api/comments', commentRoutes)

let hobbyRoutes = require('../server/routes/hobby-route')
server.use('/api/hobbies', hobbyRoutes)


// CATCH ALL
server.use('*', (error, req, res, next) => {
    res.status(404).send({
        error: error || 'no matching routes'
    })
})


server.listen(port, () => {
    console.log('server running on port', port)
})

