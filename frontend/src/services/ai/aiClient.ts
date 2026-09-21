import { PortfolioData, QualityCheckResult } from '../../types/portfolio';
import { SAMPLE_DEVELOPER_DATA } from '../../data/samplePortfolios';

export const aiClient = {
  async parseResume(text: string): Promise<PortfolioData> {
    try {
      const response = await fetch('/api/ai/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`AI service responded with status ${response.status}`);
      }

      const json = await response.json();
      if (json.data) {
        return json.data;
      }
      throw new Error('Invalid AI response structure');
    } catch (err) {
      console.warn('[AI Client] Backend unavailable or failed, applying client fallback heuristic:', err);
      // Client-side fallback extraction
      return generateLocalFallbackPortfolio(text);
    }
  },

  async assistText(action: 'improve' | 'professional' | 'shorten' | 'engaging', text: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, text }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.improved) return json.improved;
      }
    } catch (err) {
      console.warn('[AI Client] Assist request failed, applying local fallback:', err);
    }

    // Client fallback
    switch (action) {
      case 'professional':
        return `Proven specialist delivering robust, maintainable solutions in ${text.trim()}. Adept at agile collaboration and architectural scalability.`;
      case 'shorten':
        return text.split('.')[0] + '.';
      case 'engaging':
        return `Driven by innovation and high impact: ${text.trim()}`;
      case 'improve':
      default:
        return `${text.trim()} Dedicated to engineering excellence, thoughtful user experiences, and measurable outcomes.`;
    }
  },

  async checkQuality(portfolioData: PortfolioData): Promise<QualityCheckResult> {
    try {
      const response = await fetch('/api/ai/quality-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioData }),
      });

      if (response.ok) {
        const json = await response.json();
        return {
          score: json.score || 0,
          checks: json.checks || [],
          suggestions: json.suggestions || [],
        };
      }
    } catch (err) {
      console.warn('[AI Client] Quality check fetch failed, using local evaluator');
    }

    return evaluateQualityLocally(portfolioData);
  },

  async improveProjects(projects: any[]): Promise<any[]> {
    try {
      const response = await fetch('/api/ai/improve-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.projects) return json.projects;
      }
    } catch (err) {
      console.warn('[AI Client] Improve projects failed, returning originals');
    }
    return projects;
  }
};

function generateLocalFallbackPortfolio(rawText: string): PortfolioData {
  const base = JSON.parse(JSON.stringify(SAMPLE_DEVELOPER_DATA)) as PortfolioData;
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  // Attempt to extract name
  for (const line of lines.slice(0, 4)) {
    if (!line.includes('@') && !line.includes('http') && line.length < 35 && /^[a-zA-Z\s.'-]+$/.test(line)) {
      base.personal.name = line;
      break;
    }
  }

  // Attempt to extract email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    base.personal.email = emailMatch[0];
    base.contact.email = emailMatch[0];
  }

  // Attempt to extract phone
  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    base.personal.phone = phoneMatch[0];
    base.contact.phone = phoneMatch[0];
  }

  return base;
}

function evaluateQualityLocally(data: PortfolioData): QualityCheckResult {
  let score = 0;
  const checks: { label: string; passed: boolean; tip?: string }[] = [];

  if (data.personal?.name?.trim()) {
    score += 15;
    checks.push({ label: 'Full name available', passed: true });
  } else {
    checks.push({ label: 'Add full name', passed: false, tip: 'Specify your name in Hero section' });
  }

  if (data.personal?.headline?.trim()) {
    score += 10;
    checks.push({ label: 'Professional headline present', passed: true });
  } else {
    checks.push({ label: 'Add headline', passed: false, tip: 'Highlight your primary expertise or job title' });
  }

  if (data.about && data.about.length > 50) {
    score += 15;
    checks.push({ label: 'Comprehensive About summary', passed: true });
  } else {
    checks.push({ label: 'Elaborate About summary', passed: false, tip: 'Share your background and passion in 2-3 sentences' });
  }

  if (data.skills && data.skills.length >= 4) {
    score += 15;
    checks.push({ label: `${data.skills.length} technical skills added`, passed: true });
  } else {
    checks.push({ label: 'Add technical skills', passed: false, tip: 'List at least 4 languages or frameworks' });
  }

  if (data.projects && data.projects.length >= 2) {
    score += 20;
    checks.push({ label: `${data.projects.length} showcase projects available`, passed: true });
  } else {
    checks.push({ label: 'Add showcase projects', passed: false, tip: 'Include at least 2 standout projects with descriptions' });
  }

  if (data.social?.github || data.social?.linkedin) {
    score += 15;
    checks.push({ label: 'Professional profiles linked', passed: true });
  } else {
    checks.push({ label: 'Link GitHub or LinkedIn', passed: false, tip: 'Recruiters always look for your GitHub or LinkedIn' });
  }

  if (data.experience?.length > 0 || data.education?.length > 0) {
    score += 10;
    checks.push({ label: 'Work experience or education detailed', passed: true });
  } else {
    checks.push({ label: 'Add experience or education', passed: false, tip: 'Add college studies or previous roles' });
  }

  return {
    score: Math.min(100, score),
    checks,
    suggestions: checks.filter(c => !c.passed).map(c => c.tip || c.label),
  };
}
