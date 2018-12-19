let router = require('express').Router()
let Hobbies = require('../models/Hobby')

//GET HOBBIES BY USER
router.get('/:userId', (req, res, next) => {
    Hobbies.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//GET ALL HOBBIES IN THE DATABASE
router.get('/', (req, res, next) => {
    Hobbies.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//POST HOBBIES
router.post('/', (req, res, next) => {
    req.body.authorId = req.session.uid
    Hobbies.create(req.body)
        .then(newHobby => {
            res.send(newHobby)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

// //DELETE HOBBIES
// router.delete('/:hobbyId', (req, res, next) => {
//     Hobbies.findById(req.params.hobbyId)
//         .then(hobby => {
//             if (!hobby.authorId.equals(req.session.uid)) {
//                 return res.status(401).send("ACCESS DENIED! Only author can delete!")
//             }
//             hobby.remove(err => {
//                 if (err) {
//                     console.log(err)
//                     next()
//                     return
//                 }
//                 res.send("Successfully Deleted")
//             });
//         })
// })

module.exports = router