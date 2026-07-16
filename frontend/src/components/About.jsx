import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section reveal">
      <h2 className="section-title gradient-text">About Me</h2>
      
      <div className="about-container glass-panel">
        <div className="about-text-content">
          <h3 className="about-subtitle">Computer Science Engineering Student</h3>
          
          <p className="about-paragraph">
            I am currently pursuing a <strong>B.Tech in Computer Science & Engineering</strong> at 
            Kuppam Engineering College (2023 – 2027). Driven by a passion for automation, application design, 
            and web architectures, I love transforming logical structures into responsive interactive systems.
          </p>

          <p className="about-paragraph">
            Through collaborative projects, I've developed AI recruitment solutions using modern Python interfaces like FastAPI,
            built responsive interfaces in React, and integrated Gemini GenAI models. I am committed to leveraging clean code 
            practices and version control systems to solve real-world problems.
          </p>

          <div className="about-details-grid">
            <div className="about-detail-item">
              <span className="detail-label">Location</span>
              <span className="detail-value">Aluva, EKM, Kerala</span>
            </div>
            <div className="about-detail-item">
              <span className="detail-label">College</span>
              <span className="detail-value">Kuppam Engineering College</span>
            </div>
            <div className="about-detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">gourinandhana007.com</span>
            </div>
            <div className="about-detail-item">
              <span className="detail-label">Specialty</span>
              <span className="detail-value">Full Stack & AI Portal Design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
