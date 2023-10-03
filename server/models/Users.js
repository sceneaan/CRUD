const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    address: String,
    imagePath: String,
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel