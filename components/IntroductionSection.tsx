
import React from 'react';

const IntroductionSection: React.FC = () => {
    return (
        <section id="lfi-introduction" className="py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">The Power of Learning: An Introduction to LFI</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">From aviation safety to nuclear power, the structured process of learning from failure has been the single most critical driver of progress and safety. This is the story of Lessons For Implementation (LFI).</p>
            </div>
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mt-8">
                <div className="text-left">
                    <h3 className="text-2xl font-bold mb-4 text-indigo-800">A History Forged in Crisis</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">The concept of LFI wasn't born in a boardroom; it was forged in the crucibles of catastrophic failures. Early aviation pioneers, NASA engineers, and the nuclear industry all developed rigorous systems to ensure mistakes were never repeated. They learned a vital lesson: a failure is only a true tragedy if nothing is learned from it.</p>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto text-indigo-400 relative"><path d="m9 12 2 2 4-4"/><path d="M21 12a9 9 0 1 1-6.219-8.56"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h4 className="font-bold text-xl mb-2 text-indigo-700">Exponential Problem Solving</h4>
                        <p className="text-gray-600">A well-written LFI solves a problem not just once, but potentially thousands of times by preventing countless similar failures before they happen.</p>
                    </div>
                     <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h4 className="font-bold text-xl mb-2 text-indigo-700">Latest Trends: AI & Data Analytics</h4>
                        <p className="text-gray-600">Today, LFIs are evolving. Companies use AI to analyze historical reports, identify hidden trends, and predict future failure modes.</p>
                    </div>
                     <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h4 className="font-bold text-xl mb-2 text-indigo-700">Global Impact</h4>
                        <p className="text-gray-600">From standardized checklists in cockpits to safety protocols in plants, LFI principles make our world demonstrably safer and more efficient.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;
