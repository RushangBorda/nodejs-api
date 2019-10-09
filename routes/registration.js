const express = require('express');
const router = express.Router();
const Post = require('../models/Login');



router.post('/', async(req,res) => {
    const dt = req.body;
    const post = new Post({
        name :dt.name,
        phone_no : dt.phone_no,
        role : dt.role,
        username : dt.username,
        password : dt.password
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