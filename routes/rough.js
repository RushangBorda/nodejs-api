const express = require('express');
const router = express.Router();
const Post = require('../models/Rough');

router.get('/', async(req,res)=> {
    const data = await Post.find({completed : "false"});
    //const data_carat = await Post.find({carat : req.body.carat,completed : "false"});
    //console.log(data_carat);
    res.json(data.reverse());
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


router.put('/:id', async (req,res) => {

    const data = await Post.findOne({_id : req.params.id});
   // console.log(data);
    var name =req.body.name || data.name,
    co = req.body.completed || data.completed,
    carat = req.body.carat || data.carat,
    price = req.body.price || data.price;
    

    try {


        const updatePost = await Post.updateOne(
            {_id : req.params.id},
            {$set :{name : name,
                completed : co,
                carat : carat,
                price : price,
                rough_total : carat * price
        }}
        );
       //res.json(updatePost);
           if(updatePost != null){
            res.json({message : 'Data Updated Successfully'});
        }   
        else{
            res.json({message : 'Database Error'});
        }       
    } catch (error) {
        res.json({message : error});
    }




});


router.delete('/:id',async(req,res)=> {
    try {
        const removePost = await Post.deleteOne({_id : req.params.id});
        res.json({message : "Deleted Successfully"});        
    } catch (error) {
        res.json(error);
    }
    
});




module.exports = router;