
import { Payment } from "../models/PaymentModel.js";
import { razorpay } from "../server.js"
import crypto from 'crypto';

export const checkout = async (req, res) => {
   
    const options = {
    // "key": "YOUR_KEY_ID", 
    amount: Number(req.body.amount * 100), // Amount is in currency subunits. 
    currency: "INR",
    receipt: "order_rcptid_11"
    
    
};

  const order = await razorpay.orders.create(options);

  console.log(order);
  res.status(200).json({
    success:true,
    order,
  })
}

export const paymentVerification = async(req,res)=>{
  
  console.log(req.body)
   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
   
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig" + razorpay_signature);
  console.log("sig" + expectedSignature);

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) { 
   
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);


  }else{
    res.status(400).json({
      success:false,
    })
    return;
  }


   


  res.status(200).json({
    success:true,
  })
}