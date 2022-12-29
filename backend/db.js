const mongoose =require('mongoose')
mongoose.set('strictQuery', true);

const mongoURI= "mongodb://localhost:27017"

const connetToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("conneted to mongoose ")
    })
}
module.exports=connetToMongo;