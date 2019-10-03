const mongoose = require("mongoose");

const objSchema = mongoose.Schema({
    rough_id : String,
    carat : Number,
    unused_carat : Number,
    unused_total : Number
});

module.exports = mongoose.model("unused",objSchema);