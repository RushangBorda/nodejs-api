const mongoose = require("mongoose");

const objSchema = mongoose.Schema({
    rough_id : String,
    carat : Number,
    manager : String,
    remaining_carat : Number,
    unused_carat : Number,
    unused_total : Number,
    
},{
    timestamps : true
});

module.exports = mongoose.model("unused",objSchema);