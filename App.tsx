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
    riskAssessment: {
        beforeSeverity: 1,
        beforeLikelihood: 1,
        afterLikelihood: 1,
    },
};

const App: React.FC = () => {
    // Replace useState with useLocalStorage for robust silent auto-saving
    const [lfiData, setLfiData, isSaving, lastSaved] = useLocalStorage<LfiData>('lfi_pro_save_data', initialLfiData);
    const [currentSection, setCurrentSection] = useState<SectionKey>('template');
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [view, setView] = useState<'home' | 'tool' | 'contact' | 'cookie' | 'privacy' | 'terms'>('home');
    const [isDarkMode, setIsDarkMode] = useState(true);

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
                        className="container py-12"
                    >
                        <section className="w-full">

                            <div id="tool-workspace" className="grid lg:grid-cols-[280px_1fr] gap-6">
                                <aside className="hidden lg:block h-fit sticky top-4">
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
                                        className="glass-panel border dark:border-white/10 border-gray-200 bg-white/80 dark:bg-white/5 backdrop-blur-xl min-h-[600px] relative p-4 md:p-6"
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
                                                onSwitchSection={handleSwitchSection}
                                            />
                                        </AnimatePresence>
                                    </motion.main>
                                    <div className="lg:hidden mt-8">
                                        <QualityScore lfiData={lfiData} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm z-20">
                                <div className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2" aria-live="polite" role="status">
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
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <input
                                        type="file"
                                        id="json-upload-bottom"
                                        accept=".json"
                                        className="hidden"
                                        onChange={handleImportJSON}
                                    />
                                    <label
                                        htmlFor="json-upload-bottom"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold rounded-xl transition-colors cursor-pointer border border-indigo-200 dark:border-indigo-800 shadow-sm"
                                        title="Import an existing LFI JSON file"
                                    >
                                        <Upload size={18} />
                                        <span>Import JSON</span>
                                    </label>
                                    <button
                                        onClick={handleLoadSample}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-semibold rounded-xl transition-colors border border-amber-200 dark:border-amber-800 shadow-sm"
                                        title="Load a perfect 100/100 sample LFI to learn from"
                                    >
                                        <span className="text-xl">🎓</span>
                                        <span>Load Sample</span>
                                    </button>
                                    <button
                                        onClick={handleResetForm}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-semibold rounded-xl transition-colors border border-rose-200 dark:border-rose-800 shadow-sm"
                                        title="Clear all current data and start fresh"
                                    >
                                        <Trash2 size={18} />
                                        <span>Reset Form</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </motion.main>
                );
            case 'home':
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
                            <div className="relative overflow-hidden mb-12 pt-6 pb-10 lg:pt-10 lg:pb-14 rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-white/60 to-white/10 dark:from-white/5 dark:to-transparent backdrop-blur-3xl shadow-2xl">
                                {/* Decorative Background Elements */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/20 dark:bg-indigo-500/20 blur-3xl" />
                                <div className="absolute top-32 right-32 w-72 h-72 rounded-full bg-teal-400/20 dark:bg-teal-500/20 blur-3xl mix-blend-multiply dark:mix-blend-screen" />
                                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-500/20 blur-3xl" />

                                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 dark:bg-primary/10 text-primary dark:text-indigo-300 font-semibold text-xs mb-6"
                                    >
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                        </span>
                                        Structured LFI Creation Platform
                                    </motion.div>

                                    <motion.h1
                                        className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                                    >
                                        Create Professional LFI Reports —{' '}<br className="hidden md:block" />
                                        <span className="gradient-text">Step by Step</span>
                                    </motion.h1>

                                    <motion.p
                                        className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed text-justify"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                    >
                                        Learn how to create world-class Learning From Incident (LFI) reports step by step. This platform helps teams across every industry and business — from startups to enterprises — convert incidents, near misses, and operational failures into clear lessons that teams actually understand and act on. Get a practical framework, real examples, and structured guidance to communicate root causes, key learnings, and the actions that prevent repeat events. Build a culture of continuous improvement across your entire organization.
                                    </motion.p>

                                    <motion.p
                                        className="text-sm md:text-base font-semibold text-primary dark:text-indigo-400 mb-8 max-w-4xl mx-auto"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                                    >
                                        Create clear, structured Learning From Incident (LFI) reports in minutes using proven frameworks like 8D, A3, and DMAIC.
                                    </motion.p>

                                    <motion.div
                                        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 w-full"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                                    >
                                        <button
                                            onClick={navigateToTool}
                                            className="px-6 py-3 rounded-full font-bold text-base bg-primary hover:bg-primary-hover text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
                                        >
                                            Generate Report
                                        </button>
                                        <button
                                            onClick={() => setIsGuideOpen(true)}
                                            className="px-6 py-3 rounded-full font-bold text-base border-2 border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-white bg-white/50 dark:bg-black/20 backdrop-blur-sm transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
                                        >
                                            <BookOpen size={22} className="text-primary dark:text-indigo-400" />
                                            Best Practices Guide
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        className="flex justify-center gap-6 flex-wrap w-full"
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
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">No Software to Install — Runs in Your Browser</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            <BenefitsSection />
                        </section>
                        <div className="flex flex-col gap-12 mt-12">
                            <HowItWorks />
                            <WhoThisIsFor />
                            <FeaturesSection />
                            <IntroductionSection />
                            <WhyLfiFails />
                            <FaqSection />
                            <ClosingCta />
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
