const express = require('express');
const router = express.Router();
const jwt1 = require('jsonwebtoken');
const Post = require('../models/Login');


router.get('/',async(req,res)=>{
    var data = req.body;
    const user  ={
        role : 'signer',
        Username : 'tftyvdi',
        Password : 'akahdkb'
    };
    const Role =  data.role;
    const Username = data.username;
    const Password = data.password;
    const db = await Post.find();

    res.json(db);
    //jwt1.sign({user : user},'secretkey',(err,token) =>{
    //   res.json({token : token})
    //});

});


router.post('/', async(req,res) => {
    var data = req.body;
    // const co = req.body.completed||0;
    // const post = new Post({
    //    role : data.role,
    //    username : data.username,
    //    password : data.password
    // })    
    // try {
    //     const postSaved = await post.save();
    //     res.json(postSaved);
    // } catch (error) {
    //     res.json({message : error});
    // }
    Post.find({role : data.role,username : data.username})
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.json({message : "user not found"});
        }
        if (data.password !== user[0].password ){
            return res.json({message : "pass not match"});
        }
        if(data.password === user[0].password){
            const token = jwt1.sign({
                role :data.role,
                username : data.username,
                password : data.password
            },
            'secretkey');
            return res.json({message : "login successful",token : token});
        }
    })
    .catch( err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });     
});

module.exports = router;