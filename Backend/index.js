import express from "express"
import dotenv from "dotenv"
dotenv.config();
import userRoutes from "./routes/user.route.js"

import connectDB from "./config/db.js";
connectDB();

const app=express();
app.use(express.json());
const PORT=process.env.PORT || 3000;

// Use user routes
app.use('/api/users', userRoutes);

app.get("/",(req,res)=>{
   res.send("Welcome to dipak first Mern project");
})

app.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`)
})