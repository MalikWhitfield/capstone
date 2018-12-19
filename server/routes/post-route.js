let router = require('express').Router()
let Posts = require('../models/Post')
// let session = require('../auth/sessions')
let routes = require('../auth/routes')

//GET POSTS FOR YOUR PROFILE PAGE
router.get('/:userId', (req, res, next) => {
    Posts.find({ authorId: req.session.uid })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//GET ALL POSTS FOR TIMELINE
router.get('/', (req, res, next) => {
    Posts.find({})   //AFTER WE GET ALL POSTS, WE WANT TO GET THE POSTS OF THE PEOPLE WE FOLLOW 
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})


//CREATE POSTS 
router.post('/', (req, res, next) => {
    req.body.authorId = req.session.uid
    req.body.authorName = req.session.userName
    req.body.authorImage = req.session.userImage
    Posts.create(req.body)
        .then(newPost => {
            res.send(newPost)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

//PUT POSTS
router.put('/:postId', (req, res, next) => {
    Posts.findById(req.params.postId)
        .then(post => {
            if (!post.authorId.equals(req.session.uid)) {
                return res.status(401).send("ACCESS DENIED!")
            }
            post.update(req.body, (err) => {
                if (err) {
                    console.log(err)
                    next()
                    return
                }
                res.send("Successfully Updated")
            });
        })
})

//DELETE POSTS
router.delete('/:postId', (req, res, next) => {
    Posts.findById(req.params.postId)
        .then(post => {
            if (!post.authorId.equals(req.session.uid)) {
                return res.status(401).send("ACCESS DENIED!")
            }
            post.remove(err => {
                if (err) {
                    console.log(err)
                    next()
                    return
                }
                res.send("Successfully Deleted")
            });
        })
})





module.exports = router