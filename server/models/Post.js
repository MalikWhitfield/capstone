let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Post'


let schema = new Schema({
  content: { type: String, required: true },
  video: { type: String },
  image: { type: String },
  hobbyId: { type: ObjectId, ref: 'Hobby' },
  authorId: { type: ObjectId, ref: 'User', required: true },
  authorName: { type: String, ref: 'User', required: true },
  authorImage: { type: String, ref: 'User' }
},
  { timestamps: true }
)


module.exports = mongoose.model(schemaName, schema)