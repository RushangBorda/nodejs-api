const mongoose = require('mongoose');

const objSchema = mongoose.Schema({
    name : String,
    //rough_id : Number,
    completed : Boolean,
    carat : Number,
    price :Number,
    rough_total : Number,
    date : {
        type : Date,
        default : new Date()
    }
});
module.exports = mongoose.model('Rough',objSchema);