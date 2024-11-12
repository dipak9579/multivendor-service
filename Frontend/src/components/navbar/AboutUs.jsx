import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      
      <section className="about-us-section">
        <h3>Our Story</h3>
        <p>
          We started with a vision to make a positive impact in the industry, focusing on innovation,
          customer satisfaction, and quality. Our journey has been driven by a commitment to deliver
          outstanding services and solutions that empower our clients and community.
        </p>
      </section>
      
      <section className="about-us-section">
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide unparalleled service and to continuously adapt and grow in
          an ever-evolving marketplace. We believe in fostering a culture of trust, creativity,
          and collaboration within our team and with our clients.
        </p>
      </section>

      <section className="about-us-section team-section">
        <h3>Meet the Team</h3>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <p>Jane Doe - CEO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <p>John Smith - CTO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <p>Sarah Brown - Head of Marketing</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
