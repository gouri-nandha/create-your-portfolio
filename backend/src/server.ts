import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { parseResumeWithGemini, assistWithGemini } from './services/gemini.js';
import { analyzeQualityMock, assistTextMock } from './services/mockAi.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PortfolioAI Backend',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Resume Parsing Endpoint
app.post('/api/ai/parse-resume', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const portfolioData = await parseResumeWithGemini(text);
    res.json({
      success: true,
      data: portfolioData
    });
  } catch (err: any) {
    console.error('Error in /api/ai/parse-resume:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to process resume with AI. Fallback applied.',
      details: err.message
    });
  }
});

// In-place AI Assistant Endpoint
app.post('/api/ai/assist', async (req, res) => {
  try {
    const { action, text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const improved = await assistWithGemini(action || 'improve', text);
    res.json({
      success: true,
      improved
    });
  } catch (err: any) {
    console.error('Error in /api/ai/assist:', err);
    res.json({
      success: true,
      improved: assistTextMock(req.body.action || 'improve', req.body.text || '')
    });
  }
});

// Quality Check Endpoint
app.post('/api/ai/quality-check', (req, res) => {
  try {
    const { portfolioData } = req.body;
    if (!portfolioData) {
      return res.status(400).json({ error: 'portfolioData is required' });
    }

    const result = analyzeQualityMock(portfolioData);
    res.json({
      success: true,
      ...result
    });
  } catch (err: any) {
    console.error('Error in /api/ai/quality-check:', err);
    res.status(500).json({ error: 'Failed to evaluate portfolio quality' });
  }
});

// AI Project Description Improver (e.g. from GitHub import)
app.post('/api/ai/improve-projects', async (req, res) => {
  try {
    const { projects } = req.body;
    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: 'projects must be an array' });
    }

    const enhanced = await Promise.all(
      projects.map(async (p) => {
        const desc = p.description || `${p.title} open source project.`;
        const improved = await assistWithGemini('engaging', desc);
        return {
          ...p,
          description: improved
        };
      })
    );

    res.json({
      success: true,
      projects: enhanced
    });
  } catch (err: any) {
    console.error('Error in /api/ai/improve-projects:', err);
    res.json({ success: true, projects: req.body.projects });
  }
});

app.listen(PORT, () => {
  console.log(`[PortfolioAI Backend] Server running on http://localhost:${PORT}`);
});
