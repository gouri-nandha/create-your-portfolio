import { Portfolio } from '../../types/portfolio';

export function generateStaticHtml(portfolio: Portfolio): { html: string; css: string; js: string; readme: string } {
  const { portfolioData, style, theme, sections, name } = portfolio;
  const { personal, about, skills, projects, experience, education, certifications, achievements, social, contact } = portfolioData;

  const isDark = theme === 'dark' || theme === 'system';

  // Generate Sections HTML in the user's customized order
  const sectionsHtml = sections
    .filter(s => s.visible)
    .map(s => {
      switch (s.type) {
        case 'hero':
          return `
          <!-- Hero Section -->
          <section id="hero" class="section hero-section">
            <div class="container hero-container">
              <div class="hero-content">
                ${personal.profileImage ? `<img src="${personal.profileImage}" alt="${personal.name}" class="hero-avatar" />` : ''}
                <div class="hero-badge">Available for opportunities</div>
                <h1 class="hero-title">${personal.name || 'Your Name'}</h1>
                <p class="hero-headline">${personal.headline || 'Software Developer & Creator'}</p>
                <div class="hero-actions">
                  <a href="#projects" class="btn btn-primary">View Projects</a>
                  <a href="#contact" class="btn btn-secondary">Contact Me</a>
                </div>
                <div class="hero-meta">
                  ${personal.location ? `<span>📍 ${personal.location}</span>` : ''}
                  ${personal.email ? `<span>✉️ ${personal.email}</span>` : ''}
                </div>
              </div>
            </div>
          </section>`;

        case 'about':
          return `
          <!-- About Section -->
          <section id="about" class="section">
            <div class="container">
              <h2 class="section-title">About Me</h2>
              <div class="card about-card">
                <p class="about-text">${about || 'Welcome to my portfolio! I am passionate about technology and solving meaningful problems.'}</p>
              </div>
            </div>
          </section>`;

        case 'skills':
          return `
          <!-- Skills Section -->
          <section id="skills" class="section">
            <div class="container">
              <h2 class="section-title">Technical Skills</h2>
              <div class="skills-grid">
                ${skills.map(sk => `
                  <div class="skill-tag">
                    <span class="skill-name">${sk.name}</span>
                    ${sk.category ? `<span class="skill-category">${sk.category}</span>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </section>`;

        case 'projects':
          return `
          <!-- Projects Section -->
          <section id="projects" class="section">
            <div class="container">
              <h2 class="section-title">Featured Projects</h2>
              <div class="projects-grid">
                ${projects.map(p => `
                  <div class="card project-card">
                    ${p.image ? `<div class="project-img-wrap"><img src="${p.image}" alt="${p.title}" class="project-img" /></div>` : ''}
                    <div class="project-body">
                      <h3 class="project-title">${p.title}</h3>
                      <p class="project-desc">${p.description}</p>
                      <div class="project-tech">
                        ${p.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                      </div>
                      <div class="project-links">
                        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noreferrer" class="link-btn">GitHub</a>` : ''}
                        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" class="link-btn primary">Live Demo</a>` : ''}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>`;

        case 'experience':
          return `
          <!-- Experience Section -->
          <section id="experience" class="section">
            <div class="container">
              <h2 class="section-title">Experience</h2>
              <div class="timeline">
                ${experience.map(exp => `
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content card">
                      <div class="timeline-header">
                        <div>
                          <h3 class="role-title">${exp.role}</h3>
                          <h4 class="company-name">${exp.company}</h4>
                        </div>
                        <span class="date-badge">${exp.startDate} - ${exp.endDate}</span>
                      </div>
                      <p class="timeline-desc">${exp.description}</p>
                      ${exp.technologies?.length ? `
                        <div class="project-tech">
                          ${exp.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>`;

        case 'education':
          return `
          <!-- Education Section -->
          <section id="education" class="section">
            <div class="container">
              <h2 class="section-title">Education</h2>
              <div class="education-grid">
                ${education.map(edu => `
                  <div class="card edu-card">
                    <h3 class="edu-degree">${edu.degree}</h3>
                    <h4 class="edu-institution">${edu.institution} ${edu.field ? `— ${edu.field}` : ''}</h4>
                    <span class="date-badge">${edu.startDate} - ${edu.endDate}</span>
                    ${edu.description ? `<p class="edu-desc">${edu.description}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </section>`;

        case 'certifications':
          return certifications?.length ? `
          <!-- Certifications Section -->
          <section id="certifications" class="section">
            <div class="container">
              <h2 class="section-title">Certifications</h2>
              <div class="certs-grid">
                ${certifications.map(c => `
                  <div class="card cert-card">
                    <h3 class="cert-name">${c.name}</h3>
                    <p class="cert-issuer">${c.issuer} ${c.date ? `(${c.date})` : ''}</p>
                    ${c.url ? `<a href="${c.url}" target="_blank" rel="noreferrer" class="link-btn">View Certificate</a>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </section>` : '';

        case 'achievements':
          return achievements?.length ? `
          <!-- Achievements Section -->
          <section id="achievements" class="section">
            <div class="container">
              <h2 class="section-title">Achievements</h2>
              <ul class="achievements-list">
                ${achievements.map(a => `
                  <li class="card achievement-card">
                    <span class="achievement-icon">🏆</span>
                    <span>${a}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </section>` : '';

        case 'contact':
          return `
          <!-- Contact Section -->
          <section id="contact" class="section">
            <div class="container contact-container">
              <div class="card contact-card">
                <h2 class="section-title">Let's Connect</h2>
                <p class="contact-sub">Have an interesting project, question, or opportunity? Feel free to reach out!</p>
                <div class="contact-methods">
                  ${contact.email || personal.email ? `
                    <a href="mailto:${contact.email || personal.email}" class="contact-pill">
                      ✉️ ${contact.email || personal.email}
                    </a>
                  ` : ''}
                  ${contact.phone || personal.phone ? `
                    <a href="tel:${contact.phone || personal.phone}" class="contact-pill">
                      📞 ${contact.phone || personal.phone}
                    </a>
                  ` : ''}
                </div>
                <div class="social-row">
                  ${social.github ? `<a href="${social.github}" target="_blank" rel="noreferrer" class="social-icon">GitHub</a>` : ''}
                  ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" rel="noreferrer" class="social-icon">LinkedIn</a>` : ''}
                  ${social.twitter ? `<a href="${social.twitter}" target="_blank" rel="noreferrer" class="social-icon">Twitter</a>` : ''}
                  ${social.website ? `<a href="${social.website}" target="_blank" rel="noreferrer" class="social-icon">Website</a>` : ''}
                </div>
              </div>
            </div>
          </section>`;

        default:
          return '';
      }
    })
    .join('\n');

  // Static HTML template
  const html = `<!DOCTYPE html>
<html lang="en" class="${isDark ? 'dark' : 'light'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personal.name || 'Portfolio'} — ${personal.headline || 'Personal Portfolio'}</title>
  <meta name="description" content="${about ? about.slice(0, 160) : 'Personal Portfolio created with PortfolioAI'}">
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="style-${style}">
  <header class="site-header">
    <div class="container header-container">
      <a href="#hero" class="brand-logo">${personal.name || 'Portfolio'}</a>
      <nav class="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <button id="themeToggle" class="theme-btn" aria-label="Toggle Theme">🌓</button>
    </div>
  </header>

  <main>
    ${sectionsHtml}
  </main>

  <footer class="site-footer">
    <div class="container footer-container">
      <p>© ${new Date().getFullYear()} ${personal.name || 'Portfolio'}. Built with <a href="https://github.com" target="_blank">PortfolioAI</a>.</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;

  // Static CSS based on style
  const css = `
:root {
  --bg: ${isDark ? '#0b0f19' : '#ffffff'};
  --bg-secondary: ${isDark ? '#111827' : '#f8fafc'};
  --text: ${isDark ? '#f1f5f9' : '#0f172a'};
  --text-muted: ${isDark ? '#94a3b8' : '#64748b'};
  --card-bg: ${isDark ? '#1e293b' : '#ffffff'};
  --border: ${isDark ? '#334155' : '#e2e8f0'};
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --radius: 12px;
}

.dark {
  --bg: #0b0f19;
  --bg-secondary: #111827;
  --text: #f1f5f9;
  --text-muted: #94a3b8;
  --card-bg: #1e293b;
  --border: #334155;
}

.light {
  --bg: #ffffff;
  --bg-secondary: #f8fafc;
  --text: #0f172a;
  --text-muted: #64748b;
  --card-bg: #ffffff;
  --border: #e2e8f0;
}

/* Style Variants */
body.style-minimalist {
  --radius: 4px;
  font-family: 'Inter', system-ui, sans-serif;
}
body.style-bold {
  --radius: 16px;
  --primary: #f59e0b;
}
body.style-glass .card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
body.style-developer {
  font-family: 'JetBrains Mono', monospace;
  --radius: 6px;
  --primary: #10b981;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 16px 0;
  backdrop-filter: blur(10px);
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 20px;
}
.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--primary); }
.theme-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 1rem;
}

/* Section */
.section {
  padding: 80px 0;
}
.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
}

/* Cards */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* Hero */
.hero-section {
  padding: 120px 0 80px;
  text-align: center;
}
.hero-content {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary);
  margin-bottom: 24px;
}
.hero-badge {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  background: rgba(59, 130, 246, 0.1);
  padding: 4px 14px;
  border-radius: 9999px;
  margin-bottom: 16px;
}
.hero-title {
  font-size: 3.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.hero-headline {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: 32px;
}
.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}
.hero-meta {
  display: flex;
  gap: 24px;
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;
}
.btn-primary {
  background: var(--primary);
  color: #ffffff;
}
.btn-primary:hover { background: var(--primary-hover); }
.btn-secondary {
  background: var(--card-bg);
  color: var(--text);
  border: 1px solid var(--border);
}
.btn-secondary:hover { border-color: var(--text-muted); }

/* Skills */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.skill-tag {
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.skill-category {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}
.project-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.project-img-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.project-card:hover .project-img {
  transform: scale(1.05);
}
.project-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}
.project-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 16px;
  flex: 1;
}
.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.tech-pill {
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}
.project-links {
  display: flex;
  gap: 12px;
}
.link-btn {
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 6px;
}
.link-btn.primary {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}
.timeline-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.role-title { font-size: 1.2rem; }
.company-name { color: var(--primary); font-size: 1rem; }
.date-badge {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.timeline-desc {
  color: var(--text-muted);
  margin-bottom: 12px;
}

/* Education & Certs */
.education-grid, .certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Contact */
.contact-container {
  max-width: 650px;
}
.contact-card {
  text-align: center;
}
.contact-sub {
  color: var(--text-muted);
  margin-bottom: 24px;
}
.contact-methods {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.contact-pill {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 9999px;
  font-weight: 500;
}
.social-row {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.social-icon {
  color: var(--text-muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}
.social-icon:hover { color: var(--primary); border-color: var(--primary); }

/* Footer */
.site-footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}
.site-footer a { color: var(--text); }

/* Responsive */
@media (max-width: 768px) {
  .hero-title { font-size: 2.25rem; }
  .nav-links { display: none; }
  .hero-actions { flex-direction: column; width: 100%; }
}
`;

  // Static vanilla JS
  const js = `
// PortfolioAI Standalone Static Script
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        toggleBtn.textContent = '🌙';
      } else {
        html.classList.remove('light');
        html.classList.add('dark');
        toggleBtn.textContent = '☀️';
      }
    });
  }
});
`;

  const readme = `# ${personal.name || 'Portfolio'} — Personal Portfolio

This is a standalone static portfolio website generated by **PortfolioAI**.

## How to View
1. Double-click or open \`index.html\` directly in any web browser (Chrome, Firefox, Safari, Edge).
2. No Node.js, npm, or web server is required.

## Files
- \`index.html\`: The main HTML structure.
- \`style.css\`: The complete stylesheets for the selected **${style}** style.
- \`script.js\`: Lightweight interaction scripts (theme toggling, smooth scrolling).
`;

  return { html, css, js, readme };
}
