
import React from 'react';
import { LfiData } from '../types';
import { marked } from 'marked';

// Configure marked to break on newlines like standard text areas
marked.setOptions({
    breaks: true,
    gfm: true,
});

interface LfiPreviewContentProps {
    lfiData: LfiData;
}

const renderMarkdown = (text: string | undefined): string => {
    if (!text) return 'N/A';
    // marked.parse returns a string and handles basic markdown (bold, lists, etc)
    return marked.parse(text) as string;
};

const getRiskColorCode = (severity: number, likelihood: number): string => {
    const riskScore = severity * likelihood;
    if (riskScore >= 15) return '#EF4444'; // red-500
    if (riskScore >= 10) return '#F97316'; // orange-500
    if (riskScore >= 5) return '#FBBF24'; // yellow-400
    return '#22C55E'; // green-500
};

const generateRiskMatrixHTML = (riskAssessment: LfiData['riskAssessment']): string => {
    if (!riskAssessment) return '';
    const { beforeSeverity, beforeLikelihood, afterLikelihood } = riskAssessment;

    let table = `<div class="mb-8 print:break-inside-avoid"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">7. RISK ASSESSMENT</h3>`;
    table += `<p class="mb-4">The following matrix shows the risk level before (B) and after (A) the implementation of corrective actions.</p>`;
    table += `<table style="width:100%; border-collapse: collapse; border:1px solid #ccc;"><thead><tr><th style="border:1px solid #ccc; padding:4px;">Severity</th>`;
    for (let i = 1; i <= 5; i++) {
        table += `<th style="border:1px solid #ccc; padding:4px;">Likelihood ${i}</th>`;
    }
    table += `</tr></thead><tbody>`;

    for (let s = 5; s >= 1; s--) { // Severity rows (5 down to 1)
        table += `<tr><td style="font-weight:bold; border:1px solid #ccc; padding:4px; text-align:center;">${s}</td>`;
        for (let l = 1; l <= 5; l++) { // Likelihood columns (1 to 5)
            let cellContent = '&nbsp;';
            if (s === beforeSeverity && l === beforeLikelihood) {
                cellContent = 'B';
            }
            if (s === beforeSeverity && l === afterLikelihood) {
                cellContent = cellContent === '&nbsp;' ? 'A' : 'B → A';
            }
            const color = getRiskColorCode(s, l);
            table += `<td style="border:1px solid #ccc; background-color:${color}; color:#fff; text-align:center; font-weight:bold; padding:8px;">${cellContent}</td>`;
        }
        table += '</tr>';
    }
    table += '</tbody></table></div>';
    return table;
}

const generatePreviewHTML = (lfiData: LfiData) => {
    let imagesHtml = '';
    if (lfiData.images && lfiData.images.length > 0) {
        imagesHtml = `<div class="mt-4 print:break-inside-avoid"><p><strong>Evidence attached:</strong></p><div class="flex gap-4 mt-2 print-evidence">${lfiData.images.map(src => `<img src="${src}" style="max-height:200px; border-radius:8px; border:1px solid #e5e7eb;" />`).join('')}</div></div>`;
    }

    return `
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">1. PROBLEM IDENTIFICATION & TEAM</h3><div class="print:break-inside-avoid"><p><strong>Title:</strong> ${renderMarkdown(lfiData.problemTitle).replace(/<p>|<\/p>/g, '')}</p><p class="mt-2"><strong>Team Members / Contributors:</strong> ${renderMarkdown(lfiData.teamMembers).replace(/<p>|<\/p>/g, '')}</p></div><div class="mt-4 print:break-inside-avoid"><p><strong>Description:</strong></p><div class="leading-relaxed prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.problemStatement)}</div></div>${imagesHtml}</div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">2. ROOT CAUSE ANALYSIS</h3><div class="print:break-inside-avoid"><p><strong>Method Used:</strong> ${renderMarkdown(lfiData.rcaMethod || 'Not specified').replace(/<p>|<\/p>/g, '')}</p><p class="mt-4"><strong>Root Cause Identified:</strong></p><div class="leading-relaxed prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.rootCause)}</div></div></div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">3. LESSONS LEARNED</h3>${lfiData.lessons.filter(l => l).map((lesson, i) => `<div class="mb-4 print:break-inside-avoid"><p><strong>Lesson ${i + 1}:</strong></p><div class="leading-relaxed bg-gray-100 p-4 rounded-md mt-2 prose prose-sm max-w-none text-gray-900">${renderMarkdown(lesson)}</div></div>`).join('') || '<div class="print:break-inside-avoid"><p>No lessons entered.</p></div>'}</div>
        <div class="mb-8 print-break-before"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">4. IMPLEMENTATION ACTIONS</h3><div class="print:break-inside-avoid"><p><strong>Immediate Actions:</strong></p><div class="leading-relaxed mb-4 prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.immediateAction)}</div></div><div class="print:break-inside-avoid"><p><strong>Corrective Actions:</strong></p><div class="leading-relaxed mb-4 prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.correctiveAction)}</div></div><div class="print:break-inside-avoid"><p><strong>Systemic Improvements:</strong></p><div class="leading-relaxed prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.systemicAction)}</div></div></div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">5. PREVENTION & VALIDATION</h3><div class="print:break-inside-avoid"><p><strong>Effectiveness Validation:</strong></p><div class="leading-relaxed mb-4 prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.validation)}</div></div><div class="print:break-inside-avoid"><p><strong>Horizontal Deployment:</strong></p><div class="leading-relaxed prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.horizontal)}</div></div></div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">6. KNOWLEDGE SHARING</h3><div class="print:break-inside-avoid"><p><strong>Distribution Plan:</strong></p><div class="leading-relaxed prose prose-sm max-w-none text-gray-900">${renderMarkdown(lfiData.distribution)}</div></div>${lfiData.tags ? `<div class="mt-4 print:break-inside-avoid"><p><strong>Keywords:</strong> ${renderMarkdown(lfiData.tags).replace(/<p>|<\/p>/g, '')}</p></div>` : ''}</div>
        ${generateRiskMatrixHTML(lfiData.riskAssessment)}
        <div class="mt-12 pt-8 border-t border-gray-200 print:break-inside-avoid flex flex-col items-center text-center">
            <h4 class="font-bold text-gray-500 uppercase tracking-widest text-sm mb-4">Generated & Secured by LFI Pro</h4>
            <div class="flex gap-4">
                <a href="#" style="color:#6B7280; text-decoration:none;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#" style="color:#6B7280; text-decoration:none;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
                <a href="#" style="color:#6B7280; text-decoration:none;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                <a href="#" style="color:#6B7280; text-decoration:none;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#" style="color:#6B7280; text-decoration:none;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>
            </div>
        </div>
    `;
};

const LfiPreviewContent: React.FC<LfiPreviewContentProps> = ({ lfiData }) => {
    const htmlContent = generatePreviewHTML(lfiData);
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default LfiPreviewContent;