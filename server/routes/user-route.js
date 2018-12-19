let router = require('express').Router()
let Users = require('../models/User')

// GET USERS 
router.get('/auth', (req, res, next) => {
    Users.find().populate('name', 'bio', 'image', 'hobbies').
        exec(function (err, users) {
            if (err) return next();
        })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})


//EDIT USER INFO   BIO/IMAGE/NAME
// router.put('/:userId', (req, res ,next) => {
//     Users.find
// })