import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css';

const Timeline = () => {
  const eduRef = useRef(null);
  const certRef = useRef(null);
  const [expandedEdus, setExpandedEdus] = useState({});

  const toggleEdu = (idx) => {
    setExpandedEdus((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const educationData = [
    {
      year: '2023 – 2027',
      title: 'B.Tech – Computer Science & Engineering',
      institution: 'Kuppam Engineering College',
      detail: 'Percentage: 77%',
      description: 'Kuppam Engineering College (KEC), located in Kuppam, Chittoor District, Andhra Pradesh, is a private engineering institution offering undergraduate programs in engineering and technology. It is affiliated with Jawaharlal Nehru Technological University (JNTU) and recognized by the All India Council for Technical Education (AICTE).'
    },
    {
      year: '2023',
      title: 'Intermediate (Class XII)',
      institution: 'SNHSS Pulamkulam, N Paravoor',
      detail: 'Percentage: 80%',
      description: 'Kerala Board of Higher Secondary Examinations, Kerala. Specialized course of study in Physics, Chemistry, Mathematics, and Biology Science. SNHSS North Paravur (Sree Narayana Higher Secondary School) is a well-established educational institution located in the heart of North Paravur, Kerala. Managed by the Paravur Educational Society, it serves around 3,000 students from classes 5 to 12.'
    },
    {
      year: '2021',
      title: 'SSLC (Class X)',
      institution: 'SNHSS Pulamkulam, N Paravoor',
      detail: 'Percentage: 100%',
      description: 'Kerala Board of Public Examinations, Kerala. Completed secondary education curriculum with a perfect score of 100% (Full A+ grade). SNHSS North Paravur (Sree Narayana Higher Secondary School) is a well-established educational institution located in the heart of North Paravur, Kerala. Managed by the Paravur Educational Society, it serves around 3,000 students from classes 5 to 12.'
    }
  ];

  const certificationsData = [
    {
      date: 'Feb 2026',
      title: 'Quantum Fundamentals',
      issuer: 'Certificate Program'
    },
    {
      date: 'Dec 2025',
      title: 'GenAI-Powered Data Analytics',
      issuer: 'TATA (Forage)'
    },
    {
      date: 'May 2025',
      title: 'Microsoft Azure – AI Fundamentals',
      issuer: 'Microsoft'
    },
    {
      date: 'Sep 2024',
      title: 'Advanced Python Programming Workshop',
      issuer: 'Workshop Program'
    },
    {
      date: 'Ongoing',
      title: 'The Odin Project – Web Development',
      issuer: 'HTML, CSS, JavaScript curriculum'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (eduRef.current) observer.observe(eduRef.current);
    if (certRef.current) observer.observe(certRef.current);

    return () => {
      if (eduRef.current) observer.unobserve(eduRef.current);
      if (certRef.current) observer.unobserve(certRef.current);
    };
  }, []);

  return (
    <>
      {/* Education Section */}
      <section id="education" ref={eduRef} className="section reveal">
        <h2 className="section-title gradient-text">Academic Journey</h2>
        
        <div className="timeline-container single-column">
          <div className="timeline-track">
            {educationData.map((edu, idx) => (
              <div key={idx} className="timeline-item glass-panel">
                <span className="timeline-date">{edu.year}</span>
                <h4 className="timeline-item-title">{edu.title}</h4>
                <p className="timeline-institution">{edu.institution}</p>
                
                {edu.description && (
                  <div className={`timeline-accordion-wrapper ${expandedEdus[idx] ? 'expanded' : ''}`}>
                    <div className="timeline-accordion-content">
                      <p className="timeline-desc-text">{edu.description}</p>
                    </div>
                  </div>
                )}

                <div className="timeline-footer">
                  <div className="timeline-badge">{edu.detail}</div>
                  {edu.description && (
                    <button className="timeline-toggle-btn" onClick={() => toggleEdu(idx)}>
                      {expandedEdus[idx] ? 'Hide Details' : 'View Details'}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`timeline-chevron ${expandedEdus[idx] ? 'rotated' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" ref={certRef} className="section reveal">
        <h2 className="section-title gradient-text">Certifications</h2>
        
        <div className="timeline-container single-column">
          <div className="timeline-track">
            {certificationsData.map((cert, idx) => (
              <div key={idx} className="timeline-item glass-panel">
                <span className="timeline-date">{cert.date}</span>
                <h4 className="timeline-item-title">{cert.title}</h4>
                <p className="timeline-institution">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Timeline;
