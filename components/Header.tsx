import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
    onNavigate: (view: 'tool' | 'contact' | 'cookie' | 'privacy' | 'terms') => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isDarkMode, toggleDarkMode }) => {
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
        } else {
            onNavigate('tool');
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
        <header className="glass-panel mx-4 my-4 p-4 lg:px-8 sticky top-4 z-50 rounded-full">
            <nav className="container" style={{ padding: 0 }}>
                <div className="flex justify-between items-center w-full">
                    <a href="#" onClick={(e) => handleNavClick(e, '#tool')} className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
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
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-heading text-2xl md:text-3xl font-black tracking-tight m-0 drop-shadow-sm group-hover:opacity-80 transition-opacity">LFI Pro</span>
                    </a>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                                {link.text}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <motion.button
                            onClick={(e: any) => handleNavClick(e, '#tool')}
                            className="btn btn-primary hidden md:inline-flex"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 lg:hidden flex text-gray-800 dark:text-gray-200">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 flex flex-col gap-2 lg:hidden"
                        >
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block p-3 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-white/5 rounded-lg font-medium">
                                    {link.text}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;