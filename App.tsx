
import React, { useState } from 'react';
import { LfiData, SectionKey, TemplateKey } from './types';
import { SECTIONS } from './constants';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SectionContent from './components/SectionContent';
import FeaturesSection from './components/FeaturesSection';
import IntroductionSection from './components/IntroductionSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import GuideModal from './components/GuideModal';
import ContactPage from './components/ContactPage';
import CookiePolicy from './components/CookiePolicy';
import MobileSectionNav from './components/MobileSectionNav';
import QualityScore from './components/QualityScore';

const initialLfiData: LfiData = {
    template: null,
    problemTitle: '',
    problemStatement: '',
    rcaMethod: '',
    rootCause: '',
    lessons: ['', '', ''],
    immediateAction: '',
    correctiveAction: '',
    systemicAction: '',
    validation: '',
    horizontal: '',
    audience: [],
    distribution: '',
    tags: '',
    riskAssessment: {
        beforeSeverity: 1,
        beforeLikelihood: 1,
        afterLikelihood: 1,
    },
};

const App: React.FC = () => {
    const [lfiData, setLfiData] = useState<LfiData>(initialLfiData);
    const [currentSection, setCurrentSection] = useState<SectionKey>('template');
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [view, setView] = useState<'tool' | 'contact' | 'cookie'>('tool');

    const handleUpdateLfiData = (data: Partial<LfiData>) => {
        setLfiData(prev => ({ ...prev, ...data }));
    };

    const handleSwitchSection = (sectionId: SectionKey) => {
        setCurrentSection(sectionId);
        document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleTemplateSelect = (template: TemplateKey) => {
        handleUpdateLfiData({ template });
    };

    const handleNextSection = () => {
        const currentIndex = SECTIONS.findIndex(s => s.id === currentSection);
        if (currentIndex < SECTIONS.length - 1) {
            handleSwitchSection(SECTIONS[currentIndex + 1].id);
        }
    };

    const handlePrevSection = () => {
        const currentIndex = SECTIONS.findIndex(s => s.id === currentSection);
        if (currentIndex > 0) {
            handleSwitchSection(SECTIONS[currentIndex - 1].id);
        }
    };
    
    const renderView = () => {
        switch (view) {
            case 'contact':
                return <ContactPage onBackToTool={() => setView('tool')} />;
            case 'cookie':
                return <CookiePolicy onBackToTool={() => setView('tool')} />;
            case 'tool':
            default:
                return (
                    <main className="container mx-auto px-4 py-8 lg:py-16">
                        <section id="tool" className="w-full">
                            <div className="max-w-none p-0">
                                <div className="bg-white rounded-2xl p-6 sm:p-10 mb-8 text-center relative overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
                                     <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'var(--gradient-1)' }}></div>
                                    <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-2.5">🎯 LFI Pro</h1>
                                    <p className="text-lg sm:text-xl text-gray-600 mb-5">World's Best Lessons For Implementation Assistant</p>
                                     <button 
                                        onClick={() => setIsGuideOpen(true)}
                                        className="mb-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors"
                                    >
                                        <span className="text-lg">📖</span>
                                        View Best Practices Guide
                                    </button>
                                    <p className="text-gray-500 text-base">Transform Your Root Cause Analysis into Actionable Learning Documents</p>
                                     <div className="flex justify-center gap-4 flex-wrap mt-5">
                                        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1.5 rounded-full">✓ ISO 9001:2015 Compliant</span>
                                        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1.5 rounded-full">✓ APQP Standard</span>
                                        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1.5 rounded-full">✓ Six Sigma Compatible</span>
                                        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1.5 rounded-full">✓ Global Best Practices</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
                                    <aside className="hidden lg:block h-fit sticky top-28">
                                        <Sidebar
                                            sections={SECTIONS}
                                            activeSection={currentSection}
                                            lfiData={lfiData}
                                            onSectionClick={handleSwitchSection}
                                        />
                                        <QualityScore lfiData={lfiData} />
                                    </aside>
                                    
                                    <div>
                                        <div className="lg:hidden mb-8">
                                            <MobileSectionNav
                                                sections={SECTIONS}
                                                activeSection={currentSection}
                                                lfiData={lfiData}
                                                onSectionClick={handleSwitchSection}
                                            />
                                        </div>
                                        <main className="bg-white rounded-2xl p-6 sm:p-10 min-h-[600px]" style={{ boxShadow: 'var(--shadow)' }}>
                                            <SectionContent
                                                currentSection={currentSection}
                                                lfiData={lfiData}
                                                updateLfiData={handleUpdateLfiData}
                                                onTemplateSelect={handleTemplateSelect}
                                                onNext={handleNextSection}
                                                onPrev={handlePrevSection}
                                            />
                                        </main>
                                         <div className="lg:hidden mt-8">
                                            <QualityScore lfiData={lfiData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="space-y-24 mt-24">
                            <FeaturesSection />
                            <IntroductionSection />
                            <FaqSection />
                        </div>
                    </main>
                );
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            {isGuideOpen && <GuideModal onClose={() => setIsGuideOpen(false)} />}
            <Header onNavigate={setView} />
            {renderView()}
            <Footer onNavigate={setView} />
        </div>
    );
};

export default App;
