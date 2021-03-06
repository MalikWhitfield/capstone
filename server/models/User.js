let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'User'

//bcrypt uses hashing and salt to obfiscate your password 
let bcrypt = require('bcryptjs')
const SALT = 10

let Posts = require('./Post.js')

let hobby = new Schema({
    name: { type: String, required: true },
    level: { type: String, enum: ['Just For Fun', 'Beginner', 'Intermediate', 'Advanced'], default: 'Just For Fun', required: true },
})

let schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  //every email must be unique on the database
    password: { type: String, required: true },
    bio: { type: String },
    image: { type: String }, //DEFAULT ON THE FRONT END,
    hobbies: [hobby],
    following: [{ type: ObjectId, ref: 'User' }]
},
    { timestamps: true },
)




//THESE TWO METHODS CAN BE COPIED FOR ALL USER SCHEMA'S

//statics are used to create Model methods
schema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, SALT)
}

//schema.methods are used to add a method to a Model instance
schema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
    // return new Promise((resolve, reject) => {
    //     bcrypt.compare(password, this.password, function (err, isMatch) {
    //         if (err || !isMatch) {
    //             return reject(err)
    //         }
    //         return resolve(isMatch)
    //     })
    // })
}




module.exports = mongoose.model(schemaName, schema)