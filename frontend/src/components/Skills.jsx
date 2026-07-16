import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  const skillsData = {
    languages: [
      { name: 'Python', level: 90 },
      { name: 'C', level: 75 },
      { name: 'Java', level: 80 }
    ],
    webdev: [
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'React', level: 80 },
      { name: 'FastAPI', level: 75 }
    ],
    tools: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'Google Collab', level: 80 }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          setAnimate(true);
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

  const renderSkillGroup = (title, skillsList) => (
    <div className="skills-card glass-panel">
      <h3 className="skills-group-title">{title}</h3>
      <div className="skills-list">
        {skillsList.map((skill) => (
          <div key={skill.name} className="skill-item">
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-progress-bar-track">
              <div 
                className="skill-progress-bar-fill" 
                style={{ width: animate ? `${skill.level}%` : '0%' }}
              >
                <span className="glow-tip"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" ref={sectionRef} className="section reveal">
      <h2 className="section-title gradient-text">Technical Skills</h2>
      
      <div className="skills-grid">
        {renderSkillGroup('Programming', skillsData.languages)}
        {renderSkillGroup('Web Development', skillsData.webdev)}
        {renderSkillGroup('Tools & Environments', skillsData.tools)}
      </div>
    </section>
  );
};

export default Skills;
