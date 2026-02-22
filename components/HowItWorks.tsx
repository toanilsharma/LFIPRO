import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Lightbulb, ListChecks, Share2 } from 'lucide-react';

const steps = [
    { icon: <FileText size={28} />, number: "1", title: "Describe the Incident", description: "Capture what happened, when, where, and the impact." },
    { icon: <Search size={28} />, number: "2", title: "Identify Root Causes", description: "Dig past symptoms to find the systemic process gaps." },
    { icon: <Lightbulb size={28} />, number: "3", title: "Capture Lessons Learned", description: "Extract transferable knowledge your whole organization can use." },
    { icon: <ListChecks size={28} />, number: "4", title: "Define Corrective Actions", description: "Write SMART actions with clear owners and due dates." },
    { icon: <Share2 size={28} />, number: "5", title: "Share Across Teams", description: "Distribute findings to prevent the same failure elsewhere." },
];

const HowItWorks: React.FC = () => {
    return (
        <section className="py-16">
            <motion.div
                className="text-center mb-14"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
                    How It Works
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Five clear steps to turn any incident into a professional, shareable LFI report.
                </p>
            </motion.div>

            <div className="relative max-w-7xl mx-auto">
                {/* Connector line */}
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/20 via-indigo-500/40 to-indigo-500/20 -translate-y-1/2 z-0"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-indigo-400 flex items-center justify-center font-extrabold text-xl mb-4 ring-4 ring-white dark:ring-gray-900">
                                {step.number}
                            </div>
                            <div className="text-indigo-500 dark:text-indigo-400 mb-3">{step.icon}</div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
