import React from "react";
import { useSearchParams } from "react-router-dom";
import "./PaymentSuccess.css"; // Import external CSS

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h1 className="payment-title">Order Successful</h1>

        <p className="payment-reference">
          Reference No: <span>{referenceNum}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
