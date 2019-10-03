const express = require('express');
const router = express.Router();
const Post = require('../models/Rough');

router.get('/', async(req,res)=> {
    const data_carat = await Post.find({carat : req.body.carat,completed : "false"});
    //console.log(data_carat);
    res.json(data_carat);
})

router.post('/', async(req,res) => {
    const co = req.body.completed||0;
    const post = new Post({
        name :req.body.name,
        completed : co,
        carat : req.body.carat,
        price : req.body.price,
        rough_total : req.body.carat * req.body.price
    })    
    try {
        const postSaved = await post.save();
        if(postSaved != null){
            res.json({message : 'Data inserted Successfully'});
        }   
        else{
            res.json({message : 'Database Error'});
        } 
    } catch (error) {
        res.json({message : error});
    }
});

module.exports = router;