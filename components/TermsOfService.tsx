import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
    onBackToTool: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBackToTool }) => {
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
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-indigo-600"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400">
                        <FileText size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
                        <p className="text-gray-500 dark:text-gray-400">Last Updated: October 2026</p>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-8">
                    <p className="lead text-xl">
                        Welcome to LFI Pro. By accessing or using our incident reporting and intelligence platform, you agree to be bound by these corporate Terms of Service.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">2. Description of Service</h2>
                        <p>
                            LFI Pro provides users with an interface to generate, format, and export Learning From Incident (LFI) documents. The service is provided "AS IS" and we assume no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings for data generated entirely client-side.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">3. User Conduct and Liability</h2>
                        <p>
                            You agree NOT to use the Service to:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Upload, post, email, transmit or otherwise make available any content that is legally classified as classified state secrets without prior authorization.</li>
                            <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
                            <li>Intentionally or unintentionally violate any applicable local, state, national or international law.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">4. Modifications to Service</h2>
                        <p>
                            We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that we shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
                        </p>
                    </section>
                </div>
            </div>
        </motion.main>
    );
};

export default TermsOfService;
