import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Factory, Flame, Zap, HardHat, Droplets, Wrench } from 'lucide-react';

const IntroductionSection: React.FC = () => {
    return (
        <section id="lfi-introduction">
            <motion.div
                className="text-center md:text-left mb-16 max-w-6xl mx-auto md:mx-0 px-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-6">
                    <BookOpen size={16} />
                    Educational Resource
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">What is an LFI (Learning From Incident)?</h2>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto md:mx-0 leading-relaxed mt-6">
                    A Learning From Incident (LFI) document captures what happened, why it happened, and what must change to prevent recurrence. High-quality LFIs help organizations strengthen safety culture, improve reliability, and retain operational knowledge.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Why LFIs Matter</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        Most companies repeat the same expensive mistakes because they lack a disciplined framework for capturing and sharing lessons. A well-structured LFI breaks that cycle by ensuring that the knowledge gained from every incident is documented, communicated, and acted upon.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        The organizations that improve fastest are the ones that learn fastest. A failure is only a true loss if nothing is learned from it.
                    </p>
                </motion.div>
                <motion.div
                    className="relative flex justify-center w-full"
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-emerald-500/20 blur-[100px] rounded-full opacity-50"></div>
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Interactive Intelligence Dashboard" className="w-full max-w-[500px] h-auto rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] z-10 relative border-2 border-white/20 dark:border-gray-800 object-cover hover:scale-[1.02] transition-transform duration-500" style={{ aspectRatio: '4/3' }} />
                </motion.div>
            </div>

            {/* Industries */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white text-center">Used by Teams In</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Used by teams in manufacturing, power, oil & gas, and heavy industry to standardize incident learning.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { icon: <Factory size={24} />, label: "Manufacturing" },
                        { icon: <Flame size={24} />, label: "Oil & Gas" },
                        { icon: <Zap size={24} />, label: "Power Plants" },
                        { icon: <Droplets size={24} />, label: "Chemical Plants" },
                        { icon: <HardHat size={24} />, label: "Construction" },
                        { icon: <Wrench size={24} />, label: "Utilities" },
                    ].map((industry, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md hover:border-primary/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                        >
                            <div className="text-indigo-500 dark:text-indigo-400">{industry.icon}</div>
                            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{industry.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Prevent Repeat Failures</h4>
                    <p className="text-gray-600 dark:text-gray-400">A well-written LFI solves a problem not just once, but potentially thousands of times by preventing similar failures before they happen.</p>
                </motion.div>
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Retain Operational Knowledge</h4>
                    <p className="text-gray-600 dark:text-gray-400">When experienced engineers retire or move on, LFIs preserve their hard-won knowledge so the next generation doesn't repeat past mistakes.</p>
                </motion.div>
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Strengthen Safety Culture</h4>
                    <p className="text-gray-600 dark:text-gray-400">Sharing lessons across teams and sites creates a culture where learning from incidents is the norm, not the exception.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default IntroductionSection;
