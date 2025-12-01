import React from "react";
import Card from "./Card";
import "./Home.css"; // Import external CSS
import axios from "axios";

const Home = () => {
 const checkoutHandler = async (amount) => {
  try {
    // 1) Get Razorpay key
    const { data: { key } } = await axios.get("http://localhost:5000/api/getkey");

    // 2) Create Razorpay order
    const { data: { order } } = await axios.post(
      "http://localhost:5000/api/checkout",
      { amount }
    );

    // 3) Razorpay options
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Usha Sahu",
      description: "Test Transaction",
      image:
        "https://miro.medium.com/v2/resize:fit:7480/1*qUUATIBwysfZ6X5mds0KUg.png",
      order_id: order.id,
      callback_url: "http://localhost:5000/api/paymentVerification",

      prefill: {
        name: "loginned user",
        email: "gaurav.kumar@example.com",
        contact: "+919876543210",
      },

      notes: {
        address: "Razorpay Corporate Office",
      },

      theme: {
        color: "#00060f",
      },
    };

    // 4) Open Razorpay UI
    const razor = new window.Razorpay(options);
    razor.open();

  } catch (error) {
    console.log("Checkout error:", error);
  }
};


  return (
    <div className="home-container">
      <div className="cards-wrapper">
        <Card
          amount={5000}
          img="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
          checkoutHandler={checkoutHandler}
        />

        <Card
          amount={3000}
          img="http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          checkoutHandler={checkoutHandler}
        />
      </div>
    </div>
  );
};

export default Home;
