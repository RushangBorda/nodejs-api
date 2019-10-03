const mongoose = require('mongoose');
const objSchema = mongoose.Schema({
    role : String,
    username : String,
    password : String
});
module.exports = mongoose.model('User_db',objSchema)