const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    url:{
      type:String,
      default:"https://res.cloudinary.com/dvgt9sgl7/image/upload/v1696188188/fs-blog-header-user-retention-min__1__owfth4.jpg"
    },
    followers:[{type:ObjectId, ref:"User"}],
    following:[{type:ObjectId, ref:"User"}]

    

})

mongoose.model("User", userSchema)