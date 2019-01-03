let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Post'

let Comments = require('./Comment.js')

let schema = new Schema({
  content: { type: String, required: true },
  video: { type: String },
  image: { type: String },
  hobbyId: { type: ObjectId, ref: 'Hobby' },
  authorId: { type: ObjectId, ref: 'User', required: true },
  likes: { type: Object, default: {} }
},
  { timestamps: true }
)

schema.pre('remove', function (next) {
  this._id
  // @ts-ignore
  Promise.all([
    Comments.deleteMany({ postId: this._id })
  ])
    .then(() => next())
    .catch(err => (err))
})

module.exports = mongoose.model(schemaName, schema)