# PortfolioAI — AI-Powered Portfolio Builder

**PortfolioAI** is a modern, production-quality web application designed to allow **any student or developer** to create a stunning, professional portfolio website in minutes.

Upload a resume, paste your experience, enter your details manually, or connect your GitHub profile — Google Gemini AI extracts and structures your achievements, refines your content, and renders a live, customizable portfolio with in-place drag-and-drop section editing and instant static HTML/ZIP export.

---

## Key Features

- **Multi-Source Ingestion**:
  - **Resume Upload**: In-browser client parsing of **PDF** (`pdfjs-dist`), **DOCX** (`mammoth`), and **TXT** files.
  - **Paste Content**: Paste raw resume or LinkedIn text for instant AI analysis.
  - **GitHub Import**: Fetch public GitHub repositories, stars, and topics using the public GitHub API, with AI description enhancement.
  - **Manual Entry**: Guided form for quick customized input.
- **Structured AI Generation**:
  - Direct integration with **Google Gemini API** (`gemini-1.5-flash`), enforcing a strict typed JSON schema.
  - **Zero-Setup Mock AI Fallback**: Works 100% offline or without API keys during college presentations and local reviews.
- **15-Template Design System**:
  - **5 Aesthetic Styles**: *Minimalist, Bold, Glass, Creative, Developer*.
  - **3 Layout Variants**: *Modern Grid (Variant A)*, *Storyline (Variant B)*, and *Bento Box (Variant C)*.
  - **Themes**: *Dark, Light, System* support.
- **Visual 3-Column Portfolio Builder**:
  - **Left**: Section manager with `@dnd-kit` drag-and-drop reordering, section visibility toggling, and adding new sections.
  - **Center**: Real-time live preview with responsive viewport switches (*Desktop 100%*, *Tablet 768px*, *Mobile 375px*).
  - **Right**: In-place content editor with AI assistant buttons (`✨ Improve`, `👔 Professional`, `✂️ Shorten`, `🔥 Engaging`) with side-by-side review and accept/cancel control.
- **Portfolio Quality Checker**:
  - Real-time 0-100 completeness score with actionable checklist for missing links, descriptions, and achievements.
- **Static HTML & ZIP Export**:
  - Generates standalone, zero-dependency static bundles (`index.html`, `style.css`, `script.js`, `README.md`) packaged into `{name}-portfolio.zip` via `jszip`. Open anywhere without Node.js or web servers.
- **Authentication & Database**:
  - Firebase Authentication & Firestore persistence with automatic local storage and **1-Click Demo Login** fallback.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Framer Motion |
| **Drag & Drop** | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| **Document Parsers** | `pdfjs-dist` (PDF), `mammoth` (DOCX), Native File API (TXT) |
| **AI Integration** | Google Gemini API (`@google/generative-ai`) via secure backend proxy |
| **Static Export** | `jszip`, `file-saver`, `canvas-confetti` |
| **Backend** | Node.js, Express, TypeScript, CORS, Dotenv |
| **Auth & Database** | Firebase Auth & Firestore (with local demo fallback) |

---

## Architecture & Project Structure

```text
Portfolio/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── gemini.ts       # Google Gemini API client
│   │   │   └── mockAi.ts       # Intelligent offline AI fallback
│   │   ├── server.ts           # Express REST API endpoints
│   │   └── types.ts            # Core Portfolio JSON schemas
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── builder/        # SectionManager (dnd-kit), SectionEditor, StyleCustomizer, QualityChecker
│   │   │   ├── common/         # Navbar, Footer
│   │   │   └── portfolio/      # Modular Section Components & PortfolioRenderer
│   │   ├── context/            # AuthContext, PortfolioContext
│   │   ├── data/               # Sample Portfolios (Developer, Designer, Student)
│   │   ├── pages/              # LandingPage, AuthPage, DashboardPage, CreatePortfolioPage, TemplatesPage, BuilderPage, PreviewPage, PublicPortfolioPage
│   │   ├── services/           # Parsers (pdf, docx, txt), AI Client, GitHub API, Firebase, Exporters (HTML/ZIP)
│   │   ├── types/              # TypeScript schema definitions
│   │   ├── App.tsx             # React Router routing
│   │   ├── main.tsx
│   │   └── index.css           # Tailwind tokens & style classes
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── .env.example
├── package.json                # Root orchestration
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 1. Install Dependencies
Run the install command from the root directory:
```bash
npm run install:all
```
*(Or install in root, frontend, and backend individually: `npm install`, `cd frontend && npm install`, `cd ../backend && npm install`)*

### 2. Environment Configuration (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Note: PortfolioAI is built with a **Zero-Setup Guarantee**. Even if no keys are provided, the app runs completely in local demo mode with realistic mock AI parsing, 1-click authentication, and local persistence).*

To connect real Google Gemini AI:
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Set `GEMINI_API_KEY=your_key_here` in `.env`.

To connect real Firebase (optional):
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Email/Password and Google Authentication, Firestore, and Storage.
3. Add your web app credentials in `.env`.

### 3. Start Development Server
Run frontend and backend simultaneously with one command:
```bash
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## Application Pages & Routes

- `/` — **Landing Page**: SaaS showcase with hero, interactive builder mockup, 15 template gallery, how-it-works, and CTA.
- `/login` & `/signup` — **Auth Page**: Google login, email authentication, and 1-Click Instant Demo Login.
- `/dashboard` — **Dashboard**: View, edit, preview, delete, and download your portfolios.
- `/create` — **Portfolio Creator**: 4-step ingest modal (Resume Upload, Paste Bio, GitHub Import, Manual Entry).
- `/templates` — **Template Gallery**: Browse and launch all 15 aesthetic combinations.
- `/builder/:portfolioId` — **Visual Builder**: 3-column studio with dnd-kit drag/drop, live preview with device viewport toggles (Desktop/Tablet/Mobile), in-place AI copywriting assistant, and static ZIP exporter.
- `/preview/:portfolioId` — **Full-Screen Preview**: Distraction-free preview with floating export controls.
- `/portfolio/:username` — **Public Portfolio View**.

---

## Verification & Testing

To test the production build:
```bash
npm run build
```
Both backend and frontend will compile and validate strict TypeScript typings, JSX, and minified bundles with zero errors.

To preview the built production bundle:
```bash
npm run preview --prefix frontend
```

---

## License & Credits
Built for college evaluation and production use. 100% free and open source.
