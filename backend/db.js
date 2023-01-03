const mongoose =require('mongoose')
mongoose.set('strictQuery', true);

const mongoURI= `mongodb+srv://venustokyonotesapp:68o0khb95q08WjmG@notesapp.88lzmyx.mongodb.net/?retryWrites=true&w=majority`
// console.log(mongoURI)
const connetToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("conneted to mongoose ")
    })
}
module.exports=connetToMongo;