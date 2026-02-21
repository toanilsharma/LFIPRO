import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const IntroductionSection: React.FC = () => {
    return (
        <section id="lfi-introduction">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>The Power of Learning: An Introduction to LFI</h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '56rem', margin: '0 auto' }}>
                    From aviation safety to nuclear power, the structured process of learning from failure has been the single most critical driver of progress and safety. This is the story of Lessons For Implementation (LFI).
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>A History Forged in Crisis</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The concept of LFI wasn't born in a boardroom; it was forged in the crucibles of catastrophic failures. Early aviation pioneers, NASA engineers, and the nuclear industry all developed rigorous systems to ensure mistakes were never repeated.
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        They learned a vital lesson: a failure is only a true tragedy if nothing is learned from it.
                    </p>
                </motion.div>
                <motion.div
                    style={{ position: 'relative', display: 'flex', justifyItems: 'center', width: '100%' }}
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-hero)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%' }}></div>
                    <img src="/hero-dashboard.png" alt="Interactive Intelligence Dashboard" className="w-full max-w-[500px] h-auto rounded-3xl shadow-2xl z-10 relative border-2 border-white/20 dark:border-gray-800" style={{ margin: '0 auto' }} />
                </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Exponential Problem Solving</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>A well-written LFI solves a problem not just once, but potentially thousands of times by preventing countless similar failures before they happen.</p>
                </motion.div>
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Latest Trends: AI & Data</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>Today, LFIs are evolving. Companies use AI to analyze historical reports, identify hidden trends, and predict future failure modes.</p>
                </motion.div>
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Global Impact</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>From standardized checklists in cockpits to safety protocols in plants, LFI principles make our world demonstrably safer and more efficient.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default IntroductionSection;
