import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Presentation, Users, ShieldCheck } from 'lucide-react';

const ClosingCta: React.FC = () => {
    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent -z-10"></div>

            <motion.div
                className="max-w-6xl mx-auto text-center px-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold text-sm mb-6">
                    <Sparkles size={16} />
                    Start Building Today
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
                    Build a <span className="gradient-text">Learning Organization</span>
                </h2>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-4">
                    The companies that improve fastest are the ones that learn fastest. Turn every incident, near miss, and failure into knowledge that protects people, assets, and operations.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-10 mt-8">
                    {[
                        { icon: <Presentation size={18} />, label: "Toolbox Talks" },
                        { icon: <Users size={18} />, label: "Safety Meetings" },
                        { icon: <ShieldCheck size={18} />, label: "Training Programs" },
                    ].map((use, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <span className="text-indigo-500 dark:text-indigo-400">{use.icon}</span>
                            {use.label}
                        </div>
                    ))}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                    Used in Toolbox Talks, Safety Meetings, and Training Programs across industries worldwide.
                </p>

                <motion.button
                    onClick={() => document.getElementById('tool-workspace')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-4 rounded-full font-bold text-lg bg-primary hover:bg-primary-hover text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Start Creating Your LFI →
                </motion.button>
            </motion.div>
        </section>
    );
};

export default ClosingCta;
