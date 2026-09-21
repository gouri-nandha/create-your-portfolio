import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreatePortfolioPage } from './pages/CreatePortfolioPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { BuilderPage } from './pages/BuilderPage';
import { PreviewPage } from './pages/PreviewPage';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';

export function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create" element={<CreatePortfolioPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/builder/:portfolioId" element={<BuilderPage />} />
            <Route path="/preview/:portfolioId" element={<PreviewPage />} />
            <Route path="/portfolio/:username" element={<PublicPortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
