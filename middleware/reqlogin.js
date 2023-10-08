const jwt = require("jsonwebtoken")
const {JWT_TOK} = require("../config/keys")
const mongoose = require('mongoose')

const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === bearer abcdefgh
    if(!authorization){
        res.status(401).json({error:"you must be logged in" })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, JWT_TOK,(err,payload)=>{
        if(err){
          return  res.status(401).json({error: "you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
           req.user =  userdata
           next()
        })
        
    })
}