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

router.get('/:userId', (req, res, next) => {
    Users.findById(req.params.userId, { name: 1, bio: 1, image: 1, hobbies: 1, following: 1 })
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

// EDIT USER INFO   BIO/IMAGE/NAME
router.put('/:userId', (req, res, next) => {
    Users.findByIdAndUpdate(req.session.uid, req.body, { new: true }, (err, updatedUser) => {
        if (err) {
            console.log(err)
            next(err)
            return
        }
        res.send(updatedUser)

    })
})

//Follow/Following
router.put('/:userId/follow/:userIdToFollow', (req, res, next) => {
    Users.findById(req.session.uid)
        .then(user => {
            user.following.addToSet(req.params.userIdToFollow)
            return user.save()
        })
        .then(() => {
            res.send({ message: "Now Following User" })
        })
        .catch(err => next(err))
})

//Unfollow
router.put('/:userId/unfollow/:userIdToUnFollow', (req, res, next) => {
    Users.findById(req.session.uid)
        .then(user => {
            user.following.pull(req.params.userIdToUnFollow)
            return user.save()
        })
        .then(() => {
            res.send({ message: "User Unfollowed" })
        })
        .catch(err => next(err))
})

//Get Following
router.get('/:userId/following', (req, res, next) => {
    Users.findById(req.params.userId).populate('following', 'name image _id')
        .exec((err, user) => {
            if (err) { return next(err) }
            return res.send(user.following)
        })
})





// router.put('/:userId', (req, res, next) => {
//     Users.findById(req.session.uid, { new: true })
//         .then(user => {
//             user.update(req.body, (err, updatedUser) => {
//                 if (err) {
//                     console.log(err)
//                     next()
//                     return
//                 }
//                 res.send(updatedUser)
//             });
//         })
// })




module.exports = router