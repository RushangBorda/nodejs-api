const express = require('express');
const router = express.Router();
const Post = require('../models/Sorting');
const rough = require('../models/Rough');
const Unused = require('../models/Unused');

router.get('/:id',async(req,res)=> {
    try {
        const post = await Post.findOne({rough_id : req.params.id});
        //console.log(req.params.id);
        
        //console.log(Object.keys(post._doc[0]));
        let arr = [
            post,post.chocki,post.crystal,
        ]
        res.json(arr);
        
        

    } catch (error) {
        res.send({message : error});
    }

    try {
        const post = await rough.findById('5d78a7cc3751d917a497261c');
        //console.log(post.carat);
        //res.json(post);

      

    } catch (error) {
        res.send({message : error});
    }



})

router.get('/',async(req,res)=> {
    try {
        const post = await Post.find();                
        res.json(post.reverse());
    } catch (error) {
        res.send({message : error});
    }
})



router.post('/', async(req,res) => {

    var uc_ca ,
            uc_pr ,
            uo_ca ,
            uo_pr , 
            um_ca , 
            um_pr ,
            ug_ca ,
            ug_pr ,
            ucr_ca ,
            ucr_pr ,
            uc_tl , 
            uo_tl ,
            um_tl ,
            ug_tl , 
            ucr_tl ;







    
    var uprt,uppr;

    try {
        const post = await rough.findById(req.body._id);
        uprt = post.carat;
        uppr = post.rough_total;         
    } catch (error) {
        res.json({message : error})        
    }

    const deci = await Post.findOne({rough_id : req.body._id}) || "q";

    const deci2 = await Unused.findOne({rough_id : req.body._id}) || "q";
              
    


    const c_ca = Number(req.body.chocki_carat) || 0, 
    c_pr = Number(req.body.chocki_price) || 0,
    o_ca = Number(req.body.out_carat) || 0,
    o_pr = Number(req.body.out_price) || 0, 
    m_ca = Number(req.body.markis_carat) || 0, 
    m_pr = Number(req.body.markis_price) || 0,
    g_ca = Number(req.body.gol_carat) || 0,
    g_pr = Number(req.body.gol_price) || 0,
    cr_ca = Number(req.body.crystal_carat) || 0,
    cr_pr = Number(req.body.crystal_price) || 0,
    c_tl = c_pr * c_ca , 
    o_tl = o_ca * o_pr,
    m_tl =m_ca * m_pr ,
    g_tl = g_ca * g_pr , 
    cr_tl = cr_pr * cr_ca; 
    



    const post = new Post({
        rough_id : req.body._id,
    chocki : {
        chocki_carat : c_ca,
        chocki_price : c_pr,
        chocki_total : c_tl
    },
    out : {
        out_carat : o_ca,
        out_price : o_pr,
        out_total : o_tl
    },
    markis : {
        markis_carat : m_ca,
        markis_price : m_pr,
        markis_total : m_tl
    },
    gol : {
        gol_carat : g_ca,
        gol_price : g_pr,
        gol_total : g_tl
    },
    crystal : {
        crystal_carat : cr_ca,
        crystal_price : cr_pr,
        crystal_total : cr_tl
    },
    sort_total_carat : c_ca + o_ca + m_ca + g_ca + cr_ca,
    sort_total_price : c_tl + o_tl + m_tl + g_tl + cr_tl, 
    updated_rough_carat : uprt - (c_ca + o_ca + m_ca + g_ca + cr_ca),
    updated_rough_price : uppr - (c_tl + o_tl + m_tl + g_tl + cr_tl)

    });

    const unused = new Unused({
        rough_id : req.body._id,
        carat : uprt,
        unused_carat : uprt - (c_ca + o_ca + m_ca + g_ca + cr_ca),
        unused_total : uppr - (c_tl + o_tl + m_tl + g_tl + cr_tl)
    });


    try {
        if (deci != 'q') {
        
    
        const data_pre_sort = await Post.findOne({rough_id : req.body._id});
            



            uc_ca = c_ca + Number(data_pre_sort.chocki.chocki_carat);
            uc_pr = c_pr + Number(data_pre_sort.chocki.chocki_price);
            uo_ca = o_ca + Number(data_pre_sort.out.out_carat);
            uo_pr = o_pr + Number(data_pre_sort.out.out_price); 
            um_ca = m_ca + Number(data_pre_sort.markis.markis_carat); 
            um_pr = m_pr + Number(data_pre_sort.markis.markis_price);
            ug_ca = g_ca + Number(data_pre_sort.gol.gol_carat);
            ug_pr = g_pr + Number(data_pre_sort.gol.gol_price);
            ucr_ca = cr_ca + Number(data_pre_sort.crystal.crystal_carat);
            ucr_pr = cr_pr + Number(data_pre_sort.crystal.crystal_price);
            uc_tl = uc_pr * uc_ca; 
            uo_tl = uo_ca * uo_pr;
            um_tl = um_ca * um_pr ;
            ug_tl = ug_ca * ug_pr ; 
            ucr_tl = ucr_pr * ucr_ca;
        
        }
        
    } catch (error) {
        res.json(error)
    }    
        


    

    
    if(deci.length < 2){
        try {
            const postSaved = await post.save();
            //console.log(postSaved.sort_total_carat);
           // res.json(postSaved);
           if(postSaved != null){
            res.json({message : 'Data inserted Successfully'});
        }   
        else{
            res.json({message : 'Database Error'});
        }
        } catch (error) {
            res.json({message : error});
        }

    }
    else{
        try {
            const updatePost = await Post.updateOne(
                {rough_id : req.body._id},
                {$set :{chocki : {
                    chocki_carat : uc_ca,
                    chocki_price : uc_pr,
                    chocki_total : uc_tl
                },
                out : {
                    out_carat : uo_ca,
                    out_price : uo_pr,
                    out_total : uo_tl
                },
                markis : {
                    markis_carat : um_ca,
                    markis_price : um_pr,
                    markis_total : um_tl
                },
                gol : {
                    gol_carat : ug_ca,
                    gol_price : ug_pr,
                    gol_total : ug_tl
                },
                crystal : {
                    crystal_carat : ucr_ca,
                    crystal_price : ucr_pr,
                    crystal_total : ucr_tl
                },
                sort_total_carat : uc_ca + uo_ca + um_ca + ug_ca + ucr_ca,
                sort_total_price : uc_tl + uo_tl + um_tl + ug_tl + ucr_tl, 
                updated_rough_carat : uprt - (uc_ca + uo_ca + um_ca + ug_ca + ucr_ca),
                updated_rough_price : uppr - (uc_tl + uo_tl + um_tl + ug_tl + ucr_tl)
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



       
    }


    if(deci2.length < 2){
        

        try {
             await unused.save();
            
        } catch (error) {
            res.json({message : error});
        }


    }
    else{


        try {
            await Unused.updateOne(
                {rough_id : req.body._id},
                {$set :{
                    carat : uprt,
                    unused_carat : uprt - (uc_ca + uo_ca + um_ca + ug_ca + ucr_ca),
                    unused_total : uppr - (uc_tl + uo_tl + um_tl + ug_tl + ucr_tl)
                }}
            );
        } catch (error) {
            res.json({message : error});            
        }
    }
    
    

});

router.delete('/:id',async(req,res)=> {
    try {
        const removePost = await Post.deleteOne({rough_id : req.params.id});
        res.json({message : "Deleted Successfully"});        
    } catch (error) {
        res.json(error);
    }
    
});

router.put('/:id',async (req,res) => {

    var uprt,uppr;

        try {
            const post = await rough.findById(req.params.id);
            uprt = post.carat;
            uppr = post.rough_total;         
        } catch (error) {
            res.json({message : error})        
        }

      


        const data_pre_sort = await Post.findOne({rough_id : req.params.id});
        
        const c_ca = Number(req.body.chocki_carat) || Number(data_pre_sort.chocki.chocki_carat), 
        c_pr = Number(req.body.chocki_price) || Number(data_pre_sort.chocki.chocki_price),
        o_ca = Number(req.body.out_carat) ||  Number(data_pre_sort.out.out_carat),
        o_pr = Number(req.body.out_price) || Number(data_pre_sort.out.out_price), 
        m_ca = Number(req.body.markis_carat) ||  Number(data_pre_sort.markis.markis_carat), 
        m_pr = Number(req.body.markis_price) || Number(data_pre_sort.markis.markis_price),
        g_ca = Number(req.body.gol_carat) || Number(data_pre_sort.gol.gol_carat),
        g_pr = Number(req.body.gol_price) || Number(data_pre_sort.gol.gol_price),
        cr_ca = Number(req.body.crystal_carat) || Number(data_pre_sort.crystal.crystal_carat),
        cr_pr = Number(req.body.crystal_price) || Number(data_pre_sort.crystal.crystal_price),
        c_tl = c_pr * c_ca , 
        o_tl = o_ca * o_pr,
        m_tl =m_ca * m_pr ,
        g_tl = g_ca * g_pr , 
        cr_tl = cr_pr * cr_ca;




    try {
        const updatePost = await Post.updateOne(
            {rough_id : req.params.id},
            {$set :{chocki : {
                chocki_carat : c_ca,
                chocki_price : c_pr,
                chocki_total : c_tl
            },
            out : {
                out_carat : o_ca,
                out_price : o_pr,
                out_total : o_tl
            },
            markis : {
                markis_carat : m_ca,
                markis_price : m_pr,
                markis_total : m_tl
            },
            gol : {
                gol_carat : g_ca,
                gol_price : g_pr,
                gol_total : g_tl
            },
            crystal : {
                crystal_carat : cr_ca,
                crystal_price : cr_pr,
                crystal_total : cr_tl
            },
            sort_total_carat : c_ca + o_ca + m_ca + g_ca + cr_ca,
            sort_total_price : c_tl + o_tl + m_tl + g_tl + cr_tl, 
            updated_rough_carat : uprt - (c_ca + o_ca + m_ca + g_ca + cr_ca),
            updated_rough_price : uppr - (c_tl + o_tl + m_tl + g_tl + cr_tl)
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

    try {

        console.log(uprt - (c_ca + o_ca + m_ca + g_ca + cr_ca))
        await Unused.updateOne(
            {rough_id : req.params.id},
            {$set :{
                carat : uprt,
                unused_carat : uprt - (c_ca + o_ca + m_ca + g_ca + cr_ca),
                unused_total : uppr - (c_tl + o_tl + m_tl + g_tl + cr_tl)
            }}
        );
    } catch (error) {
        res.json({message : error});
    
    }





});

module.exports = router;