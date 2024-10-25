import express from "express"
import dotenv from "dotenv"
dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

app.get("/",(req,res)=>{
   res.send("Welcome to dipak first Mern project");
})

app.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`)
})