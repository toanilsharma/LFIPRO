import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight } from 'lucide-react';

const painPoints = [
    "Written only for compliance — not for learning",
    "Root cause never properly identified",
    "Lessons not shared across sites or teams",
    "Corrective actions not tracked to completion",
];

const WhyLfiFails: React.FC = () => {
    return (
        <section className="py-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900 dark:text-white">
                        Why Most Incident Reports <span className="text-rose-500">Fail</span>
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 max-w-4xl">
                        The majority of incident reports are filed and forgotten. Here's why — and how to fix it.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {painPoints.map((point, idx) => (
                        <motion.div
                            key={idx}
                            className="flex items-start gap-4 p-5 rounded-2xl border border-rose-200 dark:border-rose-800/50 bg-rose-50/50 dark:bg-rose-950/20"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                            <XCircle size={22} className="text-rose-500 shrink-0 mt-0.5" />
                            <span className="font-medium text-gray-800 dark:text-gray-200">{point}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="flex items-center gap-3 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <ArrowRight size={22} className="text-emerald-500 shrink-0" />
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                        LFILab fixes this with structured guidance, real-time quality scoring, and a framework that ensures every report drives real action.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyLfiFails;
