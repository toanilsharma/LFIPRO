import React from 'react';
import { motion } from 'framer-motion';
import { Waypoints, Lightbulb, ShieldCheck } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; index: number }> = ({ icon, title, description, index }) => (
    <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{ y: -10 }}
    >
        <div style={{ width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.2)', color: 'var(--primary)', marginBottom: '1.5rem', marginInline: 'auto' }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </motion.div>
);

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }} className="gradient-text">Guided, Intelligent & Compliant</h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '48rem', margin: '0 auto 3rem auto' }}>
                    Our tool doesn't just give you a blank page. It provides a world-class framework to ensure every LFI is comprehensive, actionable, and ready for global implementation.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="max-w-4xl mx-auto mb-20 relative px-4"
            >
                <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full translate-y-10"></div>
                <img src="/hero-network.png" alt="Intelligence Network Architecture" className="w-full h-auto rounded-3xl shadow-2xl relative z-10 border border-white/10 dark:border-gray-800" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                    index={0}
                    icon={<Waypoints size={32} />}
                    title="Step-by-Step Guidance"
                    description="Navigate the LFI process with a clear, structured workflow, from problem statement to global knowledge sharing."
                />
                <FeatureCard
                    index={1}
                    icon={<Lightbulb size={32} />}
                    title="Real-Time Quality Score"
                    description="Instantly assess the quality and completeness of your document with our intelligent scoring system."
                />
                <FeatureCard
                    index={2}
                    icon={<ShieldCheck size={32} />}
                    title="Industry Standard Templates"
                    description="Choose from ISO 9001, APQP/8D, Six Sigma, and A3 templates to ensure full compliance with your QMS."
                />
            </div>
        </section>
    );
};

export default FeaturesSection;