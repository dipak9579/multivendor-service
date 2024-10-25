import React from 'react';
import './Testimonials.css';
import dipak from "../../assets/dipak1.jpg"

const testimonialsData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Software Engineer',
    image: dipak,
    feedback: 'This service is fantastic! It has truly transformed the way I work and increased my productivity.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    image: 'https://via.placeholder.com/100',
    feedback: 'The team is amazing, and the results are always outstanding. I highly recommend this service!'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    role: 'UX Designer',
    image: 'https://via.placeholder.com/100',
    feedback: 'Great experience! The platform is easy to use, and the support is exceptional.'
  }
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">What Our Clients Say</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
