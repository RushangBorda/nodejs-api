const express = require('express');
const router = express.Router();
const Post = require('../models/Rough');

router.get('/c',async(req,res)=>{
    const data = await Post.find({completed : "false"});
    console.log(data);
    
})


router.get('/', async(req,res)=> {
    const data = await Post.find({completed : "false"});
    //const data_carat = await Post.find({carat : req.body.carat,completed : "false"});
    //console.log(data_carat);
    // res.json(data.reverse());
    const mydate =new Date('2019-09-27');
    //console.log(mydate);
    // mydate.setDate(mydate.getDate() + 93);
    // console.log(mydate);
    //var diff = Math.abs( new Date() - mydate);
    //console.log(Math.ceil(diff/(1000 * 3600 * 24)));
    pay_date = new Date( mydate.setDate(mydate.getDate() + 1 ));
    //console.log(pay_date);

    var dat = data.map(function(item){
       return(item)
    });




    var days = dat.map(function(item){
        var diff = Math.abs(new Date() - item.pay_date);
        return Math.ceil(diff/(1000 * 3600 *24));
        //return({item,remaining_days : diff1})
    });

    // for (let index = 0; index < days.length; index++) {
    //     //data.add("remaining_days" , days[index] );
    //     //console.log(days[index]);
        
        
    // }



    //console.log(days);
    //console.log(data);
    var combined = data.map(function(value,index) {
        console.log(value)
        return {...value._doc,remaining_days : days[index]};
    });
    console.log(days);
    res.json(combined);
})

router.post('/', async(req,res) => {
    const co = req.body.completed||0,
    date = new Date(req.body.date),
    days = Number(req.body.days);
    var pay_date = new Date(req.body.date);
    pay_date.setDate(pay_date.getDate() + days );
    const post = new Post({
        name :req.body.name,
        completed : co,
        carat : req.body.carat,
        price : req.body.price,
        days,
        date,
        pay_date,
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

router.get('/caret', async(req,res)=> {
    const datas = await Post.find({completed : "false"});
    const data = [];
    console.log("TCL: datas", datas);
    datas.map((value,id)=>{
    console.log("TCL: value", value)
        data.push(value.carat);
    })
    console.log("TCL: data", data);
    res.json(data.reverse());
});




module.exports = router;