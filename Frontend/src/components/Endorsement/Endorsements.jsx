import React from 'react';
import './Endorsements.css';
import blogger from "../../assets/techBlogger.jpeg"
import influencer from "../../assets/influencerX.jpeg"
import news from "../../assets/dailyNews.jpeg"

// Sample endorsements data
const endorsements = [
  {
    image: blogger,
    name: 'Tech Blogger',
    quote: '“This platform has revolutionized the way I find vendors!”',
    socialMedia: [
      { platform: 'Twitter', url: 'https://twitter.com/techblogger' },
      { platform: 'Instagram', url: 'https://instagram.com/techblogger' },
    ],
  },
  {
    image: influencer,
    name: 'Influencer X',
    quote: '“The most reliable and trustworthy service marketplace out there.”',
    socialMedia: [
      { platform: 'Facebook', url: 'https://facebook.com/influencerx' },
      { platform: 'YouTube', url: 'https://youtube.com/influencerx' },
    ],
  },
  {
    image: news,
    name: 'Daily News',
    quote: '“A top choice for customers and vendors alike!”',
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/dailynews' },
    ],
  },
];

const Endorsements = () => {
  return (
    <div className="endorsements-container">
      <h2 className="endorsements-title">What People Are Saying</h2>
      <div className="endorsements-list">
        {endorsements.map((endorser, index) => (
          <div className="endorsement-card" key={index}>
            <img src={endorser.image} alt={endorser.name} className="endorser-image" />
            <h3 className="endorser-name">{endorser.name}</h3>
            <p className="endorser-quote">{endorser.quote}</p>
            <div className="social-media-links">
              {endorser.socialMedia.map((media, i) => (
                <a
                  key={i}
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {media.platform}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Endorsements;
