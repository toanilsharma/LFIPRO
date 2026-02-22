import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
    onBackToTool: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToTool }) => {
    // Scroll to top when mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container py-12 max-w-4xl"
        >
            <div className="mb-8">
                <button
                    onClick={onBackToTool}
                    className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to LFI Tool
                </button>
            </div>

            <div className="glass-panel border dark:border-white/10 border-gray-200 bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl text-emerald-600 dark:text-emerald-400">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
                        <p className="text-gray-500 dark:text-gray-400">Last Updated: October 2026</p>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-8">
                    <p className="lead text-xl">
                        At LFI Pro, we are committed to protecting your privacy and ensuring the security of your industrial intelligence data. This Privacy Policy outlines how we collect, use, and safeguard your information.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when using the LFI Pro application, including:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Account information and user credentials.</li>
                            <li>Incident report data, root cause analyses, and preventative actions entered into the tool.</li>
                            <li>Usage metrics and interaction analytics to improve the software experience.</li>
                        </ul>
                        <p className="mt-4 text-sm bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-200">
                            <strong>Note:</strong> LFI Pro is designed to run completely client-side. The incident data you type into the LFI generator form is processed entirely within your local browser session and is not transmitted to our servers unless explicitly connected to a designated enterprise cloud sync feature.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">2. How We Use Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Provide, operate, and maintain the LFI application and its core features.</li>
                            <li>Improve, personalize, and expand our services securely.</li>
                            <li>Develop new industrial templates, components, and export features.</li>
                            <li>Communicate with you regarding updates, security alerts, and support messages.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">3. Data Security and Enterprise Compliance</h2>
                        <p>
                            We implement commercially reasonable technical, administrative, and physical safeguards designed to protect your information from unauthorized access, loss, misuse, or alteration. We align our data handling practices with ISO 27001 standards to ensure maximum security for industrial intellectual property.
                        </p>
                    </section>
                </div>
            </div>
        </motion.main>
    );
};

export default PrivacyPolicy;
