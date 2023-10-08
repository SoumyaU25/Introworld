const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {JWT_TOK} = require('../config/keys')
const reqlogin = require('../middleware/reqlogin')

router.get('/protected',reqlogin,(req,res)=>{
    res.send("hello user")
})


router.post("/signup", (req, res) => {
  const { name, email, password,url } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "This User email already exist" });
      }
      bcrypt.hash(password, 12).then(hashedpassword => {
        const user = new User({
          email,
          password:hashedpassword,
          name,
          url:url
        });
        user.save()
        .then((user) => {
            res.json({ message: "saved successfully" });
        })
        .catch((err) => {
            console.log(err);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/signin',(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(422).json({error:"Please provide your email and password"})
    }
    User.findOne({email:email})
    .then(savedUser =>{
        if(!savedUser){
           return res.status(422).json({error:"This User doesn't exist"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_TOK)
                const {_id,name,email,followers, following,url} = savedUser
                res.json({token,user:{_id,name,email,followers,following,url}})
            }
            else{
                return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router;
