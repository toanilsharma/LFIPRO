import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { BookOpen, ShieldCheck, Activity } from 'lucide-react';

const initialLfiData: LfiData = {
    template: null,
    teamMembers: '',
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
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="container py-12"
                    >
                        <section id="tool" className="w-full mb-12">
                            <div className="glass-panel border dark:border-white/10 border-gray-200 bg-white/50 dark:bg-white/5 backdrop-blur-xl text-center mb-8 relative overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1"
                                    style={{ background: 'var(--gradient-hero)' }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                />
                                <motion.h1
                                    className="gradient-text mb-4"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    LFI Pro
                                </motion.h1>
                                <motion.p
                                    className="text-gray-600 dark:text-gray-400 mb-6 text-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    Advanced Industrial Intelligence & Learning From Incidents
                                </motion.p>

                                <motion.button
                                    onClick={() => setIsGuideOpen(true)}
                                    className="btn btn-secondary border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 mb-6"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <BookOpen size={20} className="text-primary" />
                                    <span>Industrial Best Practices Guide</span>
                                </motion.button>

                                <div className="flex justify-center gap-4 flex-wrap">
                                    <span className="badge badge-success flex items-center gap-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"><ShieldCheck size={14} /> ISO 9001:2015</span>
                                    <span className="badge badge-primary flex items-center gap-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300"><Activity size={14} /> APQP & Six Sigma</span>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-[350px_1fr] gap-8">
                                <aside className="hidden lg:block h-fit sticky top-28">
                                    <Sidebar
                                        sections={SECTIONS}
                                        activeSection={currentSection}
                                        lfiData={lfiData}
                                        onSectionClick={handleSwitchSection}
                                    />
                                    <div className="mt-8">
                                        <QualityScore lfiData={lfiData} />
                                    </div>
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
                                    <motion.main
                                        className="glass-panel border dark:border-white/10 border-gray-200 bg-white/80 dark:bg-white/5 backdrop-blur-xl min-h-[600px] relative p-6 md:p-10"
                                        layout
                                    >
                                        <AnimatePresence mode="wait">
                                            <SectionContent
                                                key={currentSection}
                                                currentSection={currentSection}
                                                lfiData={lfiData}
                                                updateLfiData={handleUpdateLfiData}
                                                onTemplateSelect={handleTemplateSelect}
                                                onNext={handleNextSection}
                                                onPrev={handlePrevSection}
                                            />
                                        </AnimatePresence>
                                    </motion.main>
                                    <div className="lg:hidden mt-8">
                                        <QualityScore lfiData={lfiData} />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="flex flex-col gap-20 mt-20">
                            <FeaturesSection />
                            <IntroductionSection />
                            <FaqSection />
                        </div>
                    </motion.main>
                );
        }
    };

    return (
        <>
            {isGuideOpen && <GuideModal onClose={() => setIsGuideOpen(false)} />}
            <Header onNavigate={setView} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <AnimatePresence mode="wait">
                {renderView()}
            </AnimatePresence>
            <Footer onNavigate={setView} />
        </>
    );
};

export default App;
