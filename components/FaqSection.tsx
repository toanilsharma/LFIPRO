import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '1.125rem', fontWeight: 600, textAlign: 'left' }}
            >
                {question}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: 'var(--primary)' }}
                >
                    <ChevronDown size={24} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {children}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqSection: React.FC = () => {
    return (
        <section id="faq" className="container text-center mx-auto px-6 max-w-6xl">
            <motion.h2
                className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Frequently Asked Questions
            </motion.h2>
            <motion.div
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
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
            </motion.div>
        </section>
    );
};

export default FaqSection;
