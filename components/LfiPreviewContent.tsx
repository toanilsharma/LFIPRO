
import React from 'react';
import { LfiData } from '../types';

interface LfiPreviewContentProps {
    lfiData: LfiData;
}

const escapeHtml = (text: string | undefined): string => {
    if (!text) return 'N/A';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\n/g, '<br />');
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

    let table = `<div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">7. RISK ASSESSMENT</h3>`;
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
    return `
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">1. PROBLEM IDENTIFICATION & TEAM</h3><p><strong>Title:</strong> ${escapeHtml(lfiData.problemTitle)}</p><p class="mt-2"><strong>Team Members / Contributors:</strong> ${escapeHtml(lfiData.teamMembers)}</p><p class="mt-4"><strong>Description:</strong></p><p class="leading-relaxed">${escapeHtml(lfiData.problemStatement)}</p></div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">2. ROOT CAUSE ANALYSIS</h3><p><strong>Method Used:</strong> ${escapeHtml(lfiData.rcaMethod) || 'Not specified'}</p><p class="mt-4"><strong>Root Cause Identified:</strong></p><p class="leading-relaxed">${escapeHtml(lfiData.rootCause)}</p></div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">3. LESSONS LEARNED</h3>${lfiData.lessons.filter(l => l).map((lesson, i) => `<div class="mb-4"><p><strong>Lesson ${i + 1}:</strong></p><p class="leading-relaxed bg-gray-100 p-4 rounded-md mt-2">${escapeHtml(lesson)}</p></div>`).join('') || '<p>No lessons entered.</p>'}</div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">4. IMPLEMENTATION ACTIONS</h3><p><strong>Immediate Actions:</strong></p><p class="leading-relaxed mb-4">${escapeHtml(lfiData.immediateAction)}</p><p><strong>Corrective Actions:</strong></p><p class="leading-relaxed mb-4">${escapeHtml(lfiData.correctiveAction)}</p><p><strong>Systemic Improvements:</strong></p><p class="leading-relaxed">${escapeHtml(lfiData.systemicAction)}</p></div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">5. PREVENTION & VALIDATION</h3><p><strong>Effectiveness Validation:</strong></p><p class="leading-relaxed mb-4">${escapeHtml(lfiData.validation)}</p><p><strong>Horizontal Deployment:</strong></p><p class="leading-relaxed">${escapeHtml(lfiData.horizontal)}</p></div>
        <div class="mb-8"><h3 class="font-bold border-b-2 pb-2 mb-4 text-lg" style="color:var(--primary)">6. KNOWLEDGE SHARING</h3><p><strong>Distribution Plan:</strong></p><p class="leading-relaxed">${escapeHtml(lfiData.distribution)}</p>${lfiData.tags ? `<p class="mt-4"><strong>Keywords:</strong> ${escapeHtml(lfiData.tags)}</p>` : ''}</div>
        ${generateRiskMatrixHTML(lfiData.riskAssessment)}
    `;
};

const LfiPreviewContent: React.FC<LfiPreviewContentProps> = ({ lfiData }) => {
    const htmlContent = generatePreviewHTML(lfiData);
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default LfiPreviewContent;