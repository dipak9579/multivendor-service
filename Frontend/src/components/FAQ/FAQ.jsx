import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a variety of services including web development, mobile app development, and UI/UX design.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact support through our contact page or directly via email at support@example.com.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer ongoing support and maintenance services for all our products.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'We have a 30-day refund policy for all our services.',
    },
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleQuestion(index)}
            >
              {faq.question}
              <span className={`faq-icon ${activeIndex === index ? 'active' : ''}`}>▼</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
