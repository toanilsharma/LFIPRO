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
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import BenefitsSection from './components/BenefitsSection';
import HowItWorks from './components/HowItWorks';
import WhoThisIsFor from './components/WhoThisIsFor';
import WhyLfiFails from './components/WhyLfiFails';
import ClosingCta from './components/ClosingCta';
import MobileSectionNav from './components/MobileSectionNav';
import QualityScore from './components/QualityScore';
import { useLocalStorage } from './hooks/useLocalStorage';
import { perfectSampleLfi } from './sampleLfis';
import { BookOpen, ShieldCheck, Activity, Trash2, Upload, Download, Loader2, CheckCircle2 } from 'lucide-react';

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
    images: [],
    timelineEvents: [],
    actionItems: [],
    distributionMatrix: {},
    customFields: [],
    fishboneData: {
        man: [],
        machine: [],
        material: [],
        method: [],
        measurement: [],
        environment: []
    },
    riskAssessment: {
        beforeSeverity: 1,
        beforeLikelihood: 1,
        afterLikelihood: 1,
    },
    matrixConfig: {
        size: 5,
        severityLabels: ['1 - Negligible', '2 - Minor', '3 - Moderate', '4 - Major', '5 - Catastrophic'],
        likelihoodLabels: ['1 - Rare', '2 - Unlikely', '3 - Possible', '4 - Likely', '5 - Certain']
    }
};

const App: React.FC = () => {
    // Replace useState with useLocalStorage for robust silent auto-saving
    const [lfiData, setLfiData, isSaving, lastSaved] = useLocalStorage<LfiData>('lfi_pro_save_data', initialLfiData);
    const [currentSection, setCurrentSection] = useState<SectionKey>('template');
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [view, setView] = useState<'home' | 'tool' | 'contact' | 'cookie' | 'privacy' | 'terms'>('home');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isPresentationMode, setIsPresentationMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Safety net: Prevent accidental tab closure if data is actively compressing/saving
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isSaving) {
                e.preventDefault();
                e.returnValue = 'Work is still saving. Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isSaving]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleUpdateLfiData = (data: Partial<LfiData>) => {
        setLfiData(prev => ({ ...prev, ...data }));
    };

    const handleSwitchSection = (sectionId: SectionKey) => {
        setCurrentSection(sectionId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const updateData = (section: keyof LfiData, field: string, value: any) => {
        setLfiData(prev => ({
            ...prev,
            [section]: typeof prev[section] === 'object' && prev[section] !== null
                ? { ...prev[section], [field]: value }
                : value
        }));
    };

    const handleResetForm = () => {
        if (window.confirm("Are you sure you want to clear all data? This will permanently delete your current progress.")) {
            setLfiData(initialLfiData);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLoadSample = () => {
        if (window.confirm("Load the perfect 100/100 sample LFI? This will overwrite your current work.")) {
            setLfiData(perfectSampleLfi);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonObj = JSON.parse(event.target?.result as string);
                // Basic validation: ensure it has standard LFI properties
                if (jsonObj && jsonObj.problemTitle !== undefined) { // Changed from jsonObj.id to problemTitle as id might not always be present
                    setLfiData(jsonObj);
                    alert("LFI Data imported successfully!");
                } else {
                    alert("Invalid LFI Data format.");
                }
            } catch (err) {
                console.error("Failed to parse JSON file", err);
                alert("Failed to parse JSON file. Ensure it is a valid LFILab export.");
            }
        };
        reader.readAsText(file);
        // Reset file input
        e.target.value = '';
    };

    const navigateToTool = () => {
        setView('tool');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderView = () => {
        switch (view) {
            case 'contact':
                return <ContactPage onBackToTool={() => setView('home')} />;
            case 'cookie':
                return <CookiePolicy onBackToTool={() => setView('home')} />;
            case 'privacy':
                return <PrivacyPolicy onBackToTool={() => setView('home')} />;
            case 'terms':
                return <TermsOfService onBackToTool={() => setView('home')} />;
            case 'tool':
                return (
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col pt-4 pb-0 px-4 md:px-6 h-[calc(100vh-76px)] overflow-hidden"
                    >
                        <section className="w-full flex-1 min-h-0 flex flex-col">

                            <div id="tool-workspace" className={`flex-1 min-h-0 ${isPresentationMode ? 'presentation-mode block overflow-y-auto' : 'grid lg:grid-cols-[280px_1fr]'} gap-6`}>
                                {!isPresentationMode && (
                                    <aside className="hidden lg:flex flex-col h-full overflow-hidden">
                                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-6">
                                            <Sidebar
                                                sections={SECTIONS}
                                                activeSection={currentSection}
                                                lfiData={lfiData}
                                                onSectionClick={handleSwitchSection}
                                            />
                                            <div className="mt-8 mb-4">
                                                <QualityScore lfiData={lfiData} onNavigate={handleSwitchSection} />
                                            </div>
                                        </div>
                                    </aside>
                                )}

                                <div className="flex flex-col h-full overflow-hidden min-w-0">
                                    {!isPresentationMode && (
                                        <div className="lg:hidden mb-4 flex-shrink-0">
                                            <MobileSectionNav
                                                sections={SECTIONS}
                                                activeSection={currentSection}
                                                lfiData={lfiData}
                                                onSectionClick={handleSwitchSection}
                                            />
                                        </div>
                                    )}
                                    <motion.main
                                        className={`flex-1 overflow-y-auto custom-scrollbar glass-panel !p-0 border dark:border-white/10 border-gray-200 bg-white/80 dark:bg-white/5 backdrop-blur-xl relative flex flex-col ${isPresentationMode ? 'min-h-screen' : ''}`}
                                        layout
                                    >
                                        <div className={`flex-1 ${isPresentationMode ? 'p-8 md:p-12' : 'p-4 md:p-8'}`}>
                                            <AnimatePresence mode="wait">
                                                <SectionContent
                                                    key={currentSection}
                                                    currentSection={currentSection}
                                                    lfiData={lfiData}
                                                    updateLfiData={handleUpdateLfiData}
                                                    onTemplateSelect={handleTemplateSelect}
                                                    onNext={handleNextSection}
                                                    onPrev={handlePrevSection}
                                                    onSwitchSection={handleSwitchSection}
                                                />
                                            </AnimatePresence>
                                        </div>

                                        {!isPresentationMode && (
                                            <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 md:px-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 rounded-b-2xl backdrop-blur-md">
                                                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium flex items-center gap-2" aria-live="polite" role="status">
                                                    {isSaving ? (
                                                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                                            <Loader2 size={16} className="animate-spin" />
                                                            Saving to browser...
                                                        </div>
                                                    ) : lastSaved ? (
                                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400" title="Safely stored purely in your local browser storage.">
                                                            <CheckCircle2 size={16} />
                                                            Saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                            Auto-saving enabled
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    <input
                                                        type="file"
                                                        id="json-upload-bottom"
                                                        accept=".json"
                                                        className="hidden"
                                                        onChange={handleImportJSON}
                                                    />
                                                    <label
                                                        htmlFor="json-upload-bottom"
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold rounded-lg transition-colors cursor-pointer border border-indigo-200 dark:border-indigo-800 shadow-sm text-sm"
                                                        title="Import an existing LFI JSON file"
                                                    >
                                                        <Upload size={14} />
                                                        <span className="hidden lg:inline">Import</span>
                                                    </label>
                                                    <button
                                                        onClick={handleLoadSample}
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-semibold rounded-lg transition-colors border border-amber-200 dark:border-amber-800 shadow-sm text-sm"
                                                        title="Load a perfect sample LFI"
                                                    >
                                                        <span className="text-sm">🎓</span>
                                                        <span className="hidden lg:inline">Sample</span>
                                                    </button>
                                                    <button
                                                        onClick={handleResetForm}
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-semibold rounded-lg transition-colors border border-rose-200 dark:border-rose-800 shadow-sm text-sm"
                                                        title="Clear all current data"
                                                    >
                                                        <Trash2 size={14} />
                                                        <span className="hidden lg:inline">Reset</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.main>
                                    {!isPresentationMode && (
                                        <div className="lg:hidden mt-4 flex-shrink-0 pb-4">
                                            <QualityScore lfiData={lfiData} onNavigate={handleSwitchSection} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </motion.main>
                );
            case 'home':
            default:
                return (
                    <main className="flex flex-col w-full">
                        {/* 
                          HERO SECTION - Fixed to Viewport Height
                          calc(100vh - 76px) assumes the header is ~76px tall.
                        */}
                        <section
                            id="hero"
                            className="w-full min-h-[calc(100vh-76px)] flex flex-col justify-start pt-16 md:pt-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-[#0B0F19] dark:to-[#131B2F]"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/20 dark:bg-indigo-500/20 blur-3xl" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal-400/10 dark:bg-teal-500/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-500/20 blur-3xl" />

                            <div className="relative z-10 container mx-auto px-6 text-center py-12 md:py-20 flex flex-col items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 dark:bg-primary/10 text-primary dark:text-indigo-300 font-semibold text-xs mb-8"
                                >
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                    </span>
                                    Structured LFI Creation Platform
                                </motion.div>

                                <motion.h1
                                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] max-w-5xl mx-auto"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                                >
                                    Create Professional LFI Reports —{' '}<br className="hidden md:block" />
                                    <span className="gradient-text">Step by Step</span>
                                </motion.h1>

                                <motion.p
                                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                >
                                    Convert incidents, near misses, and operational failures into clear lessons that teams actually understand and act on. No software to install.
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 w-full max-w-lg mx-auto"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                                >
                                    <button
                                        onClick={navigateToTool}
                                        className="px-8 py-4 rounded-full font-bold text-lg bg-primary hover:bg-primary-hover text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
                                    >
                                        Generate Report
                                    </button>
                                    <button
                                        onClick={() => setIsGuideOpen(true)}
                                        className="px-8 py-4 rounded-full font-bold text-lg border-2 border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-white bg-white/50 dark:bg-black/20 backdrop-blur-sm transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
                                    >
                                        <BookOpen size={24} className="text-primary dark:text-indigo-400" />
                                        Best Practices Guide
                                    </button>
                                </motion.div>

                                <motion.div
                                    className="flex justify-center gap-6 flex-wrap w-full mt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                >
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md text-sm">
                                        <ShieldCheck size={20} className="text-emerald-500" />
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Works for Any Team or Industry</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md text-sm">
                                        <Activity size={20} className="text-indigo-500" />
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Browser-Based Local Storage</span>
                                    </div>
                                </motion.div>

                                {/* Scroll Indicator */}
                                <motion.div
                                    className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                >
                                    <span className="text-xs font-semibold uppercase tracking-widest">Discover More</span>
                                    <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
                                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce mt-1"></div>
                                    </div>
                                </motion.div>
                            </div>
                        </section>

                        {/* Scrolling Content Below the Fold */}
                        <div className="w-full bg-white dark:bg-darkbg relative z-20">
                            <div className="container py-16 mx-auto">
                                <BenefitsSection />
                            </div>

                            <div className="bg-gray-50 dark:bg-[#131B2F] border-t border-b border-gray-200 dark:border-gray-800 w-full py-16">
                                <div className="container mx-auto">
                                    <HowItWorks />
                                </div>
                            </div>

                            <div className="container py-16 mx-auto flex flex-col gap-16">
                                <WhoThisIsFor />
                                <FeaturesSection />
                                <IntroductionSection />
                                <WhyLfiFails />
                                <FaqSection />
                                <ClosingCta />
                            </div>
                        </div>
                    </main>
                );
        }
    };

    return (
        <>
            {isGuideOpen && <GuideModal onClose={() => setIsGuideOpen(false)} />}
            <Header
                onNavigate={setView}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                isPresentationMode={isPresentationMode}
                togglePresentationMode={() => {
                    setIsPresentationMode(prev => {
                        const nextState = !prev;
                        if (nextState) {
                            handleSwitchSection('preview');
                        }
                        return nextState;
                    });
                }}
            />
            <AnimatePresence mode="wait">
                {renderView()}
            </AnimatePresence>
            {view !== 'tool' && <Footer onNavigate={setView} />}
        </>
    );
};

export default App;
