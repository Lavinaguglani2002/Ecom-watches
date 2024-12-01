const mongoose=require('mongoose')
const connectdb=async()=>{
    try {
        
        await mongoose.connect("mongodb://127.0.0.1:27017/Watches");
        console.log("database connect")

        
    } catch (error) {
console.log("error")        
    }
}

module.exports=connectdb