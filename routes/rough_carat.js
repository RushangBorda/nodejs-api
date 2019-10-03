const express = require('express');
const router = express.Router();
const Post = require('../models/Rough');

router.get('/', async(req,res)=> {
    const data_carat = await Post.find({completed : "false"});
    var arr = [];
    for (let index = 0; index < data_carat.length; index++) {
       arr.push(data_carat[index].carat);
        
    }
     res.json(arr);
});

module.exports = router;