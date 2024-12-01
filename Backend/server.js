const express=require('express')
const connectdb=require("./config/db")
const authRoute=require("./routes/authRoute")
const cors=require('cors')
const colors=require('colors')
const dotenv=require('dotenv')
const app = express()
const categoryRoute=require("./routes/categoryRoute")
const productRoute=require("./routes/productRoute")

require('dotenv').config();

connectdb();
app.use(cors())
app.use(express.json());
app.use('/api/v1/auth',authRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)
app.get('/',(req,res)=>{
    res.send({
        message:"welcome to ecommerce app"  //morgan api ke url btata hai
    })

})
const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server running on ${PORT} `.bgGreen.white);
})