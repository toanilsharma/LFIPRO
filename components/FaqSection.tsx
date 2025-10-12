
import React from 'react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <div className="bg-white rounded-lg shadow-sm">
        <details className="p-6 cursor-pointer group">
            <summary className="flex justify-between items-center font-semibold text-lg list-none">
                {question}
                <span className="text-indigo-500 transform transition-transform duration-300 group-open:rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                </span>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">{children}</p>
        </details>
    </div>
);

const FaqSection: React.FC = () => {
    return (
        <section id="faq">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <FaqItem question='Why is a "Lessons For Implementation" (LFI) document important?'>
                        An LFI is critical because it moves beyond simply identifying a root cause to creating a concrete plan for learning and prevention. It ensures that the knowledge gained from an incident is captured, shared, and implemented globally to prevent recurrence.
                    </FaqItem>
                    <FaqItem question="How does this tool help with compliance?">
                        The tool is built on the foundations of major international quality standards. By providing templates for ISO 9001 (CAPA), APQP (8D), and others, it ensures that the structure and content of your LFI meet the rigorous documentation requirements of auditors and quality management systems.
                    </FaqItem>
                    <FaqItem question="What is the difference between a Corrective and a Systemic Action?">
                        A <strong>Corrective Action</strong> fixes the specific root cause (e.g., updating one procedure). A <strong>Systemic Action</strong> improves the entire system to prevent similar issues elsewhere (e.g., changing the review process for all procedures).
                    </FaqItem>
                    <FaqItem question="How is the 'LFI Quality Score' calculated?">
                        The score is a real-time guide evaluating your document's completeness and conciseness. It rewards you for filling in all critical sections with clear, impactful information while encouraging brevity to keep the LFI focused. The goal is to help you create a high-quality, professional LFI that is typically around two pages, following international best practices.
                    </FaqItem>
                     <FaqItem question="Is my data saved on your servers?">
                        No. This application runs entirely in your browser. All the data you enter is stored locally on your machine and is never transmitted to any server. When you close the browser tab, the data is gone unless you export it. Your privacy and data security are fully in your control.
                    </FaqItem>
                    <FaqItem question="Can I export my document in different formats?">
                        Yes. Once you have completed your LFI, you can export it as a professional PDF, a Microsoft Word (.doc) file for further editing, copy the content to your clipboard for easy sharing, or print it directly.
                    </FaqItem>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
