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
    Posts.find({}).sort({ createdAt: "desc" })
        .populate('authorId', 'name image _id')
        //AFTER WE GET ALL POSTS, WE WANT TO GET THE POSTS OF THE PEOPLE WE FOLLOW
        .exec((err, data) => {
            if (err) { return next(err) }
            res.send(data)
        })
})


//CREATE POSTS 
router.post('/', (req, res, next) => {
    req.body.authorId = req.session.uid
    Posts.create(req.body)
        .then(newPost => {
            newPost._doc.authorId = { //THIS DATA IS ONLY FOR FRONT END VISUALIZATION AND RESPONSE
                name: req.session.userName,
                image: req.session.userImage,
                _id: req.session.uid
            }
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

//Likes ROUTE
router.put('/likes/:postId', (req, res, next) => {
    Posts.findById(req.params.postId)
        .then(post => {
            if (post.likes[req.session.uid] || !req.session.uid) {
                res.status(401).send('Sorry, cannot like post again')
                return
            }
            post.likes[req.session.uid] = 1
            post.markModified('likes')
            post.save((err) => {
                if (err) {
                    console.log(err)
                    return res.send(err)
                }
                return res.send(post)
            })
        })
        .catch(err => {
            console.log(err)
            next()
        })
})





module.exports = router