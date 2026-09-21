import { extractTextFromPDF } from './pdfParser';
import { extractTextFromDOCX } from './docxParser';

export async function extractTextFromTXT(file: File): Promise<string> {
  try {
    const text = await file.text();
    return text.trim();
  } catch (error: any) {
    console.error('TXT reading error:', error);
    throw new Error('Failed to read text file.');
  }
}

export async function parseResumeFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  if (extension === 'pdf') {
    return await extractTextFromPDF(file);
  } else if (extension === 'docx') {
    return await extractTextFromDOCX(file);
  } else if (extension === 'txt') {
    return await extractTextFromTXT(file);
  } else {
    throw new Error(`Unsupported file type: .${extension}. Please upload a PDF, DOCX, or TXT file.`);
  }
}
