import React from 'react';
import './TrustBadges.css';

// Sample badges and links data
const badges = [
  { icon: '🔒', title: 'Secure Transactions', description: 'Your data is protected with SSL encryption.' },
  { icon: '✅', title: 'Verified Vendors', description: 'Only certified vendors are listed on our platform.' },
  { icon: '⚙️', title: 'Reliability', description: 'Trusted by thousands of users for seamless experiences.' },
];



const TrustBadges = () => {
  return (
    <div className="trust-container">
      <h2 className="trust-title">Trusted by Thousands</h2>
      <div className="badges-section">
        {badges.map((badge, index) => (
          <div className="badge-card" key={index}>
            <span className="badge-icon">{badge.icon}</span>
            <h3 className="badge-title">{badge.title}</h3>
            <p className="badge-description">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
