const express = require('express');
const router = express.Router();
const Post = require('../models/Rough');
const Unused  = require('../models/Unused')

router.get('/:id', async(req,res)=> {
    const data = await Unused.findOne({rough_id : req.params.id});
    
    if(data == null){
        const data = await Post.findById(req.params.id);
        res.json(data);
        //console.log('rough')        
    }
    else{
        res.json(data);
        //console.log('remaining')
    }
      
})



router.delete('/:id',async(req,res)=> {
    try {
        const removePost = await Unused.deleteOne({rough_id : req.params.id});
        res.json({message : "Deleted Successfully"});        
    } catch (error) {
        res.json(error);
    }
    
});




module.exports = router;