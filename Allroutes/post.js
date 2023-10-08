const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const reqlogin = require('../middleware/reqlogin')
const Post = mongoose.model('Post')

router.get('/allpost',reqlogin, (req,res)=>{
      Post.find()
      .populate("postedby","_id name")
      .populate("comments.postedby","_id name")
      .then(posts=>{
        res.json({posts})
      })
      .catch(err=>{
        console.log(err)
      })
})

router.post('/createpost',reqlogin, (req,res)=>{
    const{title,body,url}= req.body
    if(!title || !body ){
        return res.status(422).json({error:"All fields are required"})
    }
   
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photos: url,
       
        postedby: req.user
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',reqlogin,(req,res)=>{
    Post.find({postedby:req.user._id})
    .populate("postedby","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/comment',reqlogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedby:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
                $push:{comments:comment}
            },{
                new: true
            })
            .populate("comments.postedby","id name")
            .populate("postedby","_id name")
            .then((result)=>{
                res.json(result)
            })
            .catch((err)=>{
                console.log(err)
            })
   
})

// router.post('/like',reqlogin,(res,req)=>{
//     Post.find({postedby:req.user._id},{
//         $push:{likes:req.user._id}
//     },{
//         new: true
//     }).exec((err,result)=>{
//         if(err){
//           return res.status(422).json({error:err})  
//         }
//         else{
//             res.json(result)
//         }
//     })
// })
// router.post('/unlike',reqlogin,(res,req)=>{
//     Post.findByIdAndUpdate(req.body.postid,{
//         $pull:{likes:req.user._id}
//     },{
//         new: true
//     }).exec((err,result)=>{
//         if(err){
//           return res.status(422).json({error:err})  
//         }
//         else{
//             res.json(result)
//         }
//     })
//})

router.delete('/deletepost/:postid',reqlogin,(req,res)=>{

    Post.findOne({_id:req.params.postid})
    .populate("postedby","_id")
    .then((post)=>{
       // res.json(result)
       if(!post){
        return res.status(422).json({error:err})
       }

       if(post.postedby._id.toString()=== req.user._id.toString()){
        post.deleteOne()
        .then(result=>{
            res.json(result)
        })
        .catch((err )=>{
             console.log(err)
        })
       }
      
    })
    .catch((err )=>{
        console.log(err)
    })

})

module.exports = router