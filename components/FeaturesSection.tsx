import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full text-white mb-6" style={{ backgroundImage: 'var(--gradient-1)' }}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Guided, Intelligent & Compliant</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">Our tool doesn't just give you a blank page. It provides a world-class framework to ensure every LFI is comprehensive, actionable, and ready for global implementation.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-waypoints"><path d="M12 2L6 22l6-4 6 4V2z"/><path d="M12 18l-6-4"/><path d="M12 18l6-4"/></svg>}
                    title="Step-by-Step Guidance"
                    description="Navigate the LFI process with a clear, structured workflow, from problem statement to global knowledge sharing."
                />
                <FeatureCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>}
                    title="Real-Time Quality Score"
                    description="Instantly assess the quality and completeness of your document with our intelligent scoring system."
                />
                <FeatureCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                    title="Industry Standard Templates"
                    description="Choose from ISO 9001, APQP/8D, Six Sigma, and A3 templates to ensure full compliance with your QMS."
                />
            </div>
        </section>
    );
};

export default FeaturesSection;