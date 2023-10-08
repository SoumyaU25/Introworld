const express = require('express')
const app = express()
const PORT =  5001
const cors = require('cors')
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')


//require('./model/user');




mongoose.connect(MONGOURI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

mongoose.connection.on('connected', ()=>{
    console.log("Mongoose connected")
})
mongoose.connection.on('error', (err)=>{
    console.log("Mongoose error", err)
})

// const customMIddleware = (req,res,next)=>{
//     console.log("Middleware")
//     next()
// }
// //app.use(customMIddleware);
// //KKaxW6uTGxHgPuHz

// app.get('/',(req,res)=>{
//     console.log("home")
//     res.send("hello word")
// })
// app.get('/about',customMIddleware,(req,res)=>{
//     console.log("about")
//     res.send("about page")
// })

require('./model/user')
require('./model/post')

// // app.use(cors({
// //       origin: "http://localhost:3000"
// // })
// )
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     next();
// })

app.use(express.json())
app.use(require('./Allroutes/auth'))
app.use(require('./Allroutes/post'))
app.use(require('./Allroutes/user'))


if(process.env.NODE_ENV=="production"){
    
    const path = require('path')
    app.get("/",(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'client','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(PORT,()=>{
    console.log("server running",PORT)
})