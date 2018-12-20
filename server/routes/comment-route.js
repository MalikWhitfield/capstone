let router = require('express').Router()
let Comments = require('../models/Comment')

//GET COMMENTS
router.get('/:postId', (req, res, next) => {
    Comments.find({ postId: req.params.postId })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//POST COMMENTS
router.post('/', (req, res, next) => {
    req.body.authorId = req.session.uid
    req.body.authorName = req.session.userName
    req.body.authorImage = req.session.userImage
    Comments.create(req.body)
        .then(newComment => {
            res.send(newComment)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//DELETE COMMENTS
router.delete('/:commentId', (req, res, next) => {
    Comments.findById(req.params.commentId)
        .then(comment => {
            if (!comment.authorId.equals(req.session.uid)) {
                return res.status(401).send("ACCESS DENIED! Only author can delete!")
            }
            comment.remove(err => {
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