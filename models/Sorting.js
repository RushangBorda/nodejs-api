const mongoose = require('mongoose');

const objSchema = mongoose.Schema({
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
    gol : {
        gol_carat : Number,
        gol_price : Number,
        gol_total : Number 
    },
    crystal : {
        crystal_carat : Number,
        crystal_price : Number,
        crystal_total : Number
    },

    sort_total_carat : Number,
    sort_total_price : Number,
    updated_rough_carat : Number,
    updated_rough_price : Number,
    date : {
        type : Date,
        default : new Date()
    }
});
module.exports = mongoose.model('Sort',objSchema);