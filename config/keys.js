// module.exports={
//     MONGOURI : "mongodb+srv://soumya:KKaxW6uTGxHgPuHz@cluster0.h1atirr.mongodb.net/?retryWrites=true&w=majority",
//     JWT_TOK : "abcdefgh"
// }

if(process.env.NODE_ENV=='production'){
    module.exports = require('./prod')
}
else{
   module.exports = require('./dev')
}