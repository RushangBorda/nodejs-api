const express = require('express');
const Obj = require('../models/User');
const route = express.Router;

route.post('/',async(req,res) => {
    const obj = new Obj({
        
        rough_id : req.body.rough_id,/*
    chocki : {
        chocki_carat : req.body.chocki_carat,
        chocki_price : req.body.chocki_price,
        chocki_total : req.body.chocki_carat * req.body.chocki_price
    },
    out : {
        out_carat : req.body.out_carat,
        out_price : req.body.out_price,
        out_total : req.body.out_carat * req.body.out_price
    },
    markis : {
        markis_carat : req.body.markis_carat,
        markis_price : req.body.markis_price,
        markis_total : req.body.markis_price * req.body.markis_carat
    },
    sort_total_carat : req.body.chocki_carat + req.body.markis_carat + req.body.out_carat
    //sort_total_price : (req.body.chocki_carat * req.body.chocki_price) + (req.body.markis_carat * req.body.markis_price) + (req.body.out_carat * req.body.out_price)
*/})
    
    try {
        const postObj = await obj.save();
        res.json(postObj);        
    } catch (error) {
        res.json({message : error});
    }

});

module.exports = route;