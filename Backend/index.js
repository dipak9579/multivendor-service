import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import userRoutes from "./routes/user.route.js"
import vendorRoutes from "./routes/vendor.route.js"
import serviceRoutes from "./routes/service.route.js"
import bookingRoutes from './routes/booking.route.js';

import connectDB from "./config/db.js";
connectDB();

const app=express();
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT || 3000;

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/vendors',vendorRoutes);
app.use('/api/services',serviceRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`)
})