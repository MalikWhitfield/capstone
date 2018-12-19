var mongoose = require('mongoose')
var connectionString = 'mongodb://hobbyshare1:hobbyshare1@ds131763.mlab.com:31763/hobbyshare'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err => {
    console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
    console.log('Connected to Database')
})