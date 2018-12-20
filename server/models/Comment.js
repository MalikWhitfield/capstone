let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  postId: { type: ObjectId, ref: 'Task', required: true },
  authorName: { type: String, ref: 'User', required: true },
  authorImage: { type: String, ref: 'User' },
},
  { timestamps: true }
)



module.exports = mongoose.model(schemaName, schema)