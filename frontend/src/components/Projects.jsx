import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  const projectsData = [
    {
      id: 'job-portal',
      title: 'AI – Powered Job Portal',
      type: 'Academic Team Project | Full Stack',
      tags: ['React', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Gemini 2.5 Flash', 'PyPDF2', 'Axios', 'GitHub'],
      description: 'An AI-powered recruitment platform that automates resume screening and candidate evaluation using LLM AI services.',
      bullets: [
        'Developed an AI-powered recruitment platform that automates resume screening and candidate evaluation using Gemini AI services.',
        'Designed full stack features including secure authentication, job posting management, and dynamic resume file upload.',
        'Built intelligent AI resume analysis engines that evaluate candidates against job requirements and output scores.',
        'Created developer-friendly application tracking pipelines and a unified recruiter dashboard for candidate comparisons.'
      ],
      github: 'https://github.com/gouri-nandha',
      demo: 'https://job-portal-frontend-gamma-brown.vercel.app/'
    },
    {
      id: 'yellow-paws',
      title: 'Yellow Paws Learning',
      type: 'Collaborative Educational App',
      tags: ['HTML5', 'CSS3', 'Git', 'GitHub'],
      description: 'A GitHub-based interactive educational learning application designed to make self-paced learning engaging.',
      bullets: [
        'Developed a clean, interactive educational learning application designed to make self-paced learning engaging.',
        'Managed project collaboratively using GitHub for version control, code review, and project coordination across the team.',
        'Optimized layouts using responsive HTML and CSS paradigms for optimal viewing on desktop and mobile platforms.'
      ],
      github: 'https://github.com/gouri-nandha/YellowPaws-Learning',
      demo: 'https://gouri-nandha.github.io/YellowPaws-Learning/'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section reveal">
      <h2 className="section-title gradient-text">Featured Projects</h2>
      
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card glass-panel">
            <div className="project-card-header">
              <span className="project-type">{project.type}</span>
              <h3 className="project-card-title">{project.title}</h3>
            </div>
            
            <p className="project-short-desc">{project.description}</p>
            
            <div className="project-tags">
              {project.tags.slice(0, 4).map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
              {project.tags.length > 4 && (
                <span className="tag tag-more">+{project.tags.length - 4} more</span>
              )}
            </div>

            <div className="project-actions">
              <button className="btn-details" onClick={() => setSelectedProject(project)}>
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="details-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <div className="project-quick-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="quick-link-icon" aria-label="GitHub Repository">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="quick-link-icon" aria-label="Live Demo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close Modal">
              &times;
            </button>
            
            <span className="modal-project-type">{selectedProject.type}</span>
            <h3 className="modal-project-title gradient-text-alt">{selectedProject.title}</h3>
            
            <div className="modal-tags">
              {selectedProject.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <div className="modal-body">
              <h4 className="modal-section-title">Key Contributions & Features</h4>
              <ul className="modal-bullet-list">
                {selectedProject.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="modal-footer">
              {selectedProject.github && (
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ marginRight: '12px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="modal-btn-icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  Source Code
                </a>
              )}
              {selectedProject.demo && (
                <a 
                  href={selectedProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="modal-btn-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
