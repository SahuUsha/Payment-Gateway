import React from "react";
import "./Card.css"; // Import external CSS

const Card = ({ amount, img, checkoutHandler }) => {
  return (
    <div className="card">
      <img src={img} alt="product" className="card-image" />

      <p className="card-price">₹{amount}</p>

      <button
        onClick={() => checkoutHandler(amount)}
        className="card-btn"
      >
        Buy Now
      </button>
    </div>
  );
};

export default Card;
