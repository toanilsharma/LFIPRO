import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
    onNavigate: (view: 'home' | 'tool' | 'contact' | 'cookie' | 'privacy' | 'terms') => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isPresentationMode?: boolean;
    togglePresentationMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isDarkMode, toggleDarkMode, isPresentationMode, togglePresentationMode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "#tool", text: "The Tool" },
        { href: "#features", text: "Features" },
        { href: "#faq", text: "FAQ" },
        { href: "contact", text: "Contact Us" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        if (href === 'contact') {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (href === '#tool') {
            onNavigate('tool');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            onNavigate('home');
            setTimeout(() => {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 50);
        }

        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="sticky top-0 w-full z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-[#0B0F19]/80 backdrop-blur-xl transition-all duration-300">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 w-full">
                    {/* Logo Section */}
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group shrink-0" style={{ textDecoration: 'none' }}>
                        <div className="relative flex items-center justify-center">
                            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:scale-110 transition-transform duration-300">
                                <defs>
                                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#4F46E5" />
                                        <stop offset="1" stopColor="#06B6D4" />
                                    </linearGradient>
                                    <linearGradient id="logo-accent" x1="32" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F43F5E" />
                                        <stop offset="1" stopColor="#F97316" />
                                    </linearGradient>
                                </defs>
                                <path d="M16 2L2 9L2 23L16 30L30 23L30 9L16 2Z" fill="url(#logo-gradient)" fillOpacity="0.15" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M16 6L6 11L6 21L16 26L26 21L26 11L16 6Z" fill="url(#logo-gradient)" />
                                <path d="M16 28V16L26 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md" />
                                <path d="M6 11L16 16L16 28" stroke="url(#logo-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="16" cy="16" r="3" fill="white" className="animate-pulse" />
                            </svg>
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-heading text-2xl md:text-3xl font-black tracking-tight m-0 drop-shadow-sm group-hover:opacity-80 transition-opacity">LFILab</span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="relative text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors group py-2"
                            >
                                {link.text}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Actions Panel */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-0">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {togglePresentationMode && (
                            <button
                                onClick={togglePresentationMode}
                                className={`p-2.5 hidden md:flex items-center justify-center rounded-full transition-colors ${isPresentationMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                aria-label="Toggle Presentation Mode"
                                title="Presentation Mode"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
                            </button>
                        )}

                        <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>

                        <motion.button
                            onClick={(e: any) => { e.preventDefault(); onNavigate('tool'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="hidden md:inline-flex px-6 py-2.5 rounded-full font-bold text-sm bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20 transition-transform active:scale-95 items-center justify-center gap-2"
                            whileHover={{ y: -1 }}
                        >
                            Get Started
                        </motion.button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 lg:hidden flex text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden lg:hidden border-t border-gray-200 dark:border-gray-800"
                        >
                            <div className="py-4 flex flex-col gap-2">
                                {navLinks.map(link => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="block px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl font-bold transition-colors"
                                    >
                                        {link.text}
                                    </a>
                                ))}
                                <button
                                    onClick={(e) => { e.preventDefault(); onNavigate('tool'); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="mt-2 mx-4 px-6 py-3 rounded-xl font-bold text-center bg-primary text-white shadow-md"
                                >
                                    Get Started
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;