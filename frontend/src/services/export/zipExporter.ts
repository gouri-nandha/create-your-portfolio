import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Portfolio } from '../../types/portfolio';
import { generateStaticHtml } from './htmlGenerator';

export async function exportPortfolioAsZip(portfolio: Portfolio): Promise<void> {
  const zip = new JSZip();
  const { html, css, js, readme } = generateStaticHtml(portfolio);

  // Add files to root
  zip.file('index.html', html);
  zip.file('style.css', css);
  zip.file('script.js', js);
  zip.file('README.md', readme);

  // Add an empty assets folder placeholder
  zip.folder('assets');

  const content = await zip.generateAsync({ type: 'blob' });
  const rawName = portfolio.portfolioData?.personal?.name || portfolio.name || 'portfolio';
  const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const filename = `${cleanName || 'my'}-portfolio.zip`;

  saveAs(content, filename);
}

export function downloadStaticHtmlFile(portfolio: Portfolio): void {
  const { html } = generateStaticHtml(portfolio);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const rawName = portfolio.portfolioData?.personal?.name || portfolio.name || 'portfolio';
  const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  saveAs(blob, `${cleanName || 'index'}.html`);
}
