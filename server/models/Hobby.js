let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Hobby Category'


let schema = new Schema({
    name: { type: String, required: true },
    created: { type: Number, required: true, default: Date.now() },
    // authorId: { type: ObjectId, ref: 'User', required: true }
})


module.exports = mongoose.model(schemaName, schema)