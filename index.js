import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import taskRoute from './routes/taskRoute.js'
mongoose.connect('mongodb+srv://nithinappari:75nlIXu4s977F7U6@cluster0.7ljelcs.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log("connection successfull"))
.catch((error)=>console.log(error))

const app=express()
const PORT = 5000
app.use(cors())
app.use(express.json())
app.use('/api',taskRoute)

app.listen(PORT,()=>{
    console.log(`server started at port: ${PORT}`)
})
