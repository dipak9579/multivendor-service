import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const vendorBenefits = [
    "Expand your reach with a wider audience",
    "Easily manage bookings and customer inquiries",
    "Increase revenue through new sales channels",
  ];

  const customerBenefits = [
    "Access a wide range of vendors and services",
    "Enjoy secure transactions and easy booking",
    "Get personalized recommendations based on preferences",
  ];

  return (
    <div className="benefits-container">
      <h2 className="benefits-title">Why Choose Us?</h2>
      <div className="benefits-section">
        <div className="benefits-card">
          <h3 className="benefits-card-title">Benefits for Vendors</h3>
          <ul className="benefits-list">
            {vendorBenefits.map((benefit, index) => (
              <li key={index} className="benefit-item">{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="benefits-card">
          <h3 className="benefits-card-title">Benefits for Customers</h3>
          <ul className="benefits-list">
            {customerBenefits.map((benefit, index) => (
              <li key={index} className="benefit-item">{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
