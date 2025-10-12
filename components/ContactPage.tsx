
import React from 'react';

interface ContactPageProps {
    onBackToTool: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBackToTool }) => {
    return (
        <div className="bg-white">
            <main className="container mx-auto px-4 py-16 lg:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold gradient-text mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 mb-12">We value your feedback and are here to help.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-gray-50 p-10 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        For any questions, feedback, bug reports, or support inquiries regarding the LFI Pro tool, please feel free to reach out to us. We are committed to providing a high-quality experience and appreciate your input.
                    </p>
                    <div className="bg-indigo-100 p-6 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-indigo-800 mb-2">Our Contact Email</h3>
                        <a 
                            href="mailto:0808miracle@gmail.com"
                            className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors break-all"
                        >
                            0808miracle@gmail.com
                        </a>
                    </div>
                    <p className="text-gray-600 text-sm mt-6">
                        Please allow up to 48 business hours for a response.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                        This tool is managed by Anil Sharma.
                    </p>
                    <div className="text-center mt-12">
                         <button 
                            onClick={onBackToTool} 
                            className="px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform" 
                            style={{ backgroundImage: 'var(--gradient-1)' }}
                        >
                            ← Back to the Tool
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;