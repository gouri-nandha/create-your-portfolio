import { GoogleGenerativeAI } from '@google/generative-ai';
import { PortfolioData } from '../types.js';
import { parseResumeTextMock, assistTextMock } from './mockAi.js';

const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (apiKey && apiKey.trim() !== '') {
  try {
    genAI = new GoogleGenerativeAI(apiKey.trim());
    console.log('[Gemini AI] Initialized successfully with API key.');
  } catch (err) {
    console.warn('[Gemini AI] Failed to initialize GoogleGenerativeAI client:', err);
  }
} else {
  console.log('[Gemini AI] No GEMINI_API_KEY found in environment. Using intelligent Mock AI fallback.');
}

export async function parseResumeWithGemini(rawText: string): Promise<PortfolioData> {
  if (!genAI) {
    return parseResumeTextMock(rawText);
  }

  const prompt = `
You are an expert resume analyzer and portfolio generator.
Analyze the following extracted text from a candidate's resume/document/profile.
Extract and organize it into STRICT JSON matching this exact structure.
Do NOT invent fake companies, degrees, projects, or certifications if not present.
If certain fields are missing, return empty strings or empty arrays.

The JSON MUST conform to this TypeScript interface:
{
  "personal": {
    "name": "string",
    "headline": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "profileImage": "string (leave empty if none)"
  },
  "about": "string (a compelling 2-3 sentence professional summary based on their background)",
  "skills": [
    { "name": "string", "category": "Frontend | Backend | Database | DevOps | Cloud | AI/ML | Mobile | Tools | Other" }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string"
    }
  ],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string",
      "technologies": ["string"]
    }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "technologies": ["string"],
      "githubUrl": "string",
      "liveUrl": "string",
      "image": "string"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string",
      "url": "string"
    }
  ],
  "achievements": ["string"],
  "research": ["string"],
  "social": {
    "github": "string",
    "linkedin": "string",
    "twitter": "string",
    "website": "string"
  },
  "contact": {
    "email": "string",
    "phone": "string"
  }
}

Return ONLY raw JSON. No markdown code blocks, no backticks, no explanations.

Resume Text:
${rawText}
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Strip markdown formatting if any
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(text) as PortfolioData;
    return parsed;
  } catch (error: any) {
    console.warn('[Gemini AI] Parsing error or rate limit hit, using intelligent fallback:', error.message || error);
    return parseResumeTextMock(rawText);
  }
}

export async function assistWithGemini(action: string, text: string): Promise<string> {
  if (!genAI || !text.trim()) {
    return assistTextMock(action, text);
  }

  const prompt = `
You are an expert copywriter and career coach for developers and tech professionals.
Perform the following action on the text: "${action}".
Options:
- "improve": Rewrite to be more polished, clear, impactful, and active.
- "professional": Rewrite using executive, industry-standard professional vocabulary.
- "shorten": Condense into a concise, punchy sentence or two while retaining key achievements.
- "engaging": Make it energetic, captivating, and outcome-oriented.

Original text:
"""${text}"""

Return ONLY the rewritten text. No greetings, quotes, or markdown explanations.
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim().replace(/^"|"$/g, '');
  } catch (error: any) {
    console.warn('[Gemini AI] Assist error, using fallback:', error.message || error);
    return assistTextMock(action, text);
  }
}
