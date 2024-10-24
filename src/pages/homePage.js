import React from 'react';
import Layout from '../components/layout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

// HeroSection Component
const HeroSection = () => (
  <section className="hero-section">
    <h1>Welcome to MediTracker</h1>
    <p>Your health, our priority. Track your medical records effortlessly.</p>
    <Link to="/get-started" className="get-started-button">Get Started</Link>
  </section>
);

// FeaturesSection Component
const FeaturesSection = () => (
  <section className="features-section">
    <h2>Features</h2>
    <ul>
      <li><strong>Easy Tracking:</strong> Keep track of your medical records with ease.</li>
      <li><strong>Reminders:</strong> Set reminders for your medications and appointments.</li>
      <li><strong>Reports:</strong> Generate detailed health reports.</li>
    </ul>
  </section>
);

// VisionSection Component
const VisionSection = () => (
  <section className="vision-section">
    <h2>Our Vision</h2>
    <p>At MediTracker, we aim to revolutionize the way you manage your health. Our vision is to provide a seamless and efficient platform for tracking medical records, ensuring that you have all the information you need at your fingertips.</p>
  </section>
);

// AboutSection Component
const AboutSection = () => (
  <section className="about-section">
    <h2>About Us</h2>
    <p>MediTracker is a leading health management platform dedicated to helping individuals keep track of their medical records. Our team of experts is committed to providing the best tools and resources to ensure your health is always a top priority.</p>
  </section>
);

// Main HomePage Component
const HomePage = () => {
  return (
    <Layout>
      <div>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            .homepage-container {
              max-width: 1200px;
              margin: 0 auto;
              background-color: #f9f9f9;
              border-radius: 12px;
              box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
              font-family: 'Source Sans Pro', sans-serif;
            }

            h1, h2 {
              font-family: 'Merriweather', serif;
              color: #333;
            }

            p {
              font-size: 1.1rem;
              line-height: 1.8;
              color: #555;
            }

            ul {
              list-style-type: none;
              padding-left: 0;
              margin-top: 20px;
            }

            ul li {
              margin-bottom: 15px;
              font-size: 1.2rem;
              color: #444;
              cursor: pointer;
              padding: 10px;
              border-radius: 8px;
              transition: background-color 0.3s ease;
            }

            ul li:hover {
              background-color: #f1f1f1;
            }

            ul li strong {
              color: #007bff;
            }

            .hero-section {
              text-align: center;
              padding: 60px 20px;
              background-color: #007bff;
              color: white;
              border-radius: 8px;
              margin-bottom: 40px;
              position: relative;
            }

            .hero-section h1 {
              font-size: 2.8rem;
              margin-bottom: 20px;
            }

            .hero-section p {
              font-size: 1.3rem;
              margin-bottom: 30px;
              color: #f0f0f0;
            }

            .get-started-button {
              background-color: #f0ad4e;
              color: white;
              font-size: 1.2rem;
              border-radius: 4px;
              text-decoration: none;
              transition: background-color 0.4s ease;
            }

            .get-started-button:hover {
              padding: 3px;
              background-color: #ec971f;
            }

            .features-section h2 {
              font-size: 2.2rem;
              margin-bottom: 25px;
              color: #007bff;
            }

            .vision-section, .about-section {
              margin: 40px 0;
              background-color: #f9f9f9;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 768px) {
              .hero-section h1 {
                font-size: 2.2rem;
              }

              .hero-section p {
                font-size: 1rem;
              }

              .get-started-button {
                font-size: 1rem;
                justify-content: center;
              }

              .homepage-container {
                padding: 10px;
              }

              ul li {
                font-size: 1rem;
              }
            }
          `}
        </style>

        <div className="homepage-container">
          <HeroSection />
          <FeaturesSection />
          <VisionSection />
          <AboutSection />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;