


import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/db.js";


connectDB();


export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});





app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)});