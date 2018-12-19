let router = require('express').Router()
let Users = require('../models/User')
let session = require('../auth/sessions')

// GET USERS 
router.get('/', (req, res, next) => {
    Users.find()
        // .populate('name', 'bio', 'image', 'hobbies').
        // exec(function (err, users) {
        //     if (err) return next();
        // })
        .then(users => {
            users.forEach(u => {
                delete u._doc.email
                delete u._doc.password
            })
            res.send(users)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})


// EDIT USER INFO   BIO/IMAGE/NAME
router.put('/:userId', (req, res, next) => {
    Users.findById(req.session.uid)
        .then(user => {
            user.update(req.body, (err) => {
                if (err) {
                    console.log(err)
                    next()
                    return
                }
                res.send('Successfully Updated User')
            });
        })
})



module.exports = router