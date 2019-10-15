const mongoose = require('mongoose');


const sortSchema = mongoose.Schema({
    rough_id : String,
    chocki : {
        chocki_carat : Number,
        chocki_price : Number,
        chocki_total : Number
    },
    out : {
        out_carat : Number,
        out_price : Number,
        out_total : Number
    },
    markis : {
        markis_carat : Number,
        markis_price : Number,
        markis_total : Number
    },
    sort_total_carat : Number,
    sort_total_price : Number 
},{
    timestamps : true
});

module.exports = mongoose.model('sort',sortSchema);