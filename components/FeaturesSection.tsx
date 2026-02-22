import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Moon, CheckSquare, Presentation, Download } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; index: number }> = ({ icon, title, description, index }) => (
    <motion.div
        className="bg-slate-800/50 backdrop-blur-md border border-slate-700 flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-800 transition-colors relative z-10 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-500/20 text-indigo-400 mb-4 shadow-sm">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-3 text-white">{title}</h3>
        <p className="text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
);

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="py-12 bg-slate-900 border-y border-slate-800 text-white relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

            <div className="text-center mb-10 relative z-10 max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-white">
                        Built-In Tools for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Every Team</span>
                    </h2>
                    <p className="text-slate-300 max-w-4xl mx-auto relative z-10 text-base md:text-lg mt-4 leading-relaxed text-justify">
                        Everything your team needs to capture, analyze, and share incident learnings — running securely in your browser with no server or subscription required.
                    </p>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <FeatureCard
                    index={0}
                    icon={<FileText size={32} />}
                    title="1-Click Print & PDF"
                    description="Instantly generate flawlessly formatted A4 documents using native browser print capabilities. No watermarks, just professional results."
                />
                <FeatureCard
                    index={1}
                    icon={<Download size={32} />}
                    title="Docx Export"
                    description="Need to make last-minute edits offline? Export your completed LFI directly to Microsoft Word with preserved formatting."
                />
                <FeatureCard
                    index={2}
                    icon={<CheckSquare size={32} />}
                    title="Real-Time Quality Score"
                    description="Our structured scoring system evaluates your inputs as you type, helping guide your team toward complete, well-structured reports before you ever hit print."
                />
                <FeatureCard
                    index={3}
                    icon={<Shield size={32} />}
                    title="100% Secure & Local"
                    description="Your sensitive data never leaves your computer. The entire application runs client-side in your browser for ultimate security and privacy."
                />
                <FeatureCard
                    index={4}
                    icon={<Presentation size={32} />}
                    title="Markdown Support"
                    description="Write richly formatted documentation effortlessly. Use bolding, bullet points, headers, and code blocks natively in the text areas."
                />
                <FeatureCard
                    index={5}
                    icon={<Moon size={32} />}
                    title="Dark & Light Mode"
                    description="Whether you are working in bright daylight or analyzing data late at night, perfectly calibrated themes adapt to your environment."
                />
            </div>
        </section>
    );
};

export default FeaturesSection;