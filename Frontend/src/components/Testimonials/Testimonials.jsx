import React from 'react';
import './Testimonials.css';
import dipak from "../../assets/dipakD.jpg"
import ganesh from "../../assets/ganeshP.jpeg"
import kaustubh from "../../assets/kaustubh.jpeg"

const testimonialsData = [
  {
    id: 1,
    name: 'Dipak Dandge',
    role: 'AC,TV Repair Technician',
    image: dipak,
    feedback: 'This service is fantastic! It has truly transformed the way I work and increased my productivity.'
  },
  {
    id: 2,
    name: 'Ganesh Parhad',
    role: 'Solar Installer',
    image: ganesh,
    feedback: 'The team is amazing, and the results are always outstanding. I highly recommend this service!'
  },
  {
    id: 3,
    name: 'Kaustubh',
    role: 'RealEstate Agent',
    image: kaustubh,
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
