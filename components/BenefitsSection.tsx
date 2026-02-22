import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingDown, Clock, CheckCircle } from 'lucide-react';

const BenefitsSection: React.FC = () => {
    return (
        <section className="mb-14 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] -z-10"></div>

            <div className="text-center mb-10 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">
                        Why Choose <span className="gradient-text">LFILab?</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mt-4 text-justify">
                        Many teams spend too much time on inconsistent incident reports that never lead to real change. LFILab helps your team build a consistent, repeatable process that turns every incident into a genuine learning opportunity.
                    </p>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        icon: <TrendingDown size={32} />,
                        title: "Prevent Recurrence",
                        description: "Reduce recurring errors by guiding teams through deep, systemic root cause analysis rather than settling for quick fixes.",
                        color: "text-rose-500",
                        bg: "bg-rose-100 dark:bg-rose-500/20"
                    },
                    {
                        icon: <Clock size={32} />,
                        title: "Save 80% Time",
                        description: "Replace the manual Word/Excel formatting grind with a streamlined, guided digital workflow that generates professional reports.",
                        color: "text-amber-500",
                        bg: "bg-amber-100 dark:bg-amber-500/20"
                    },
                    {
                        icon: <Target size={32} />,
                        title: "Standardize Reporting",
                        description: "Replace inconsistent email-based reporting. Ensure every department, shift, and team handles incidents using the same proven methodology.",
                        color: "text-emerald-500",
                        bg: "bg-emerald-100 dark:bg-emerald-500/20"
                    },
                    {
                        icon: <CheckCircle size={32} />,
                        title: "Auditor-Ready",
                        description: "Generate clear, audit-ready documentation that meets the documentation standards auditors expect from international quality management systems.",
                        color: "text-indigo-500",
                        bg: "bg-indigo-100 dark:bg-indigo-500/20"
                    }
                ].map((benefit, idx) => (
                    <motion.div
                        key={idx}
                        className={`glass-card hover:shadow-xl transition-all duration-300 ${idx % 2 === 1 ? 'lg:translate-y-8' : ''}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${benefit.bg} ${benefit.color}`}>
                            {benefit.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
