const mongoose = require('mongoose');
const objSchema = mongoose.Schema({
    role : String,
    username : String,
    password : String,
    phone_no : String,
    name : String,
    
},{
    timestamps : true
}
);
module.exports = mongoose.model('User_db',objSchema)