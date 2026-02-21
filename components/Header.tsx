import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
    onNavigate: (view: 'tool' | 'contact' | 'cookie') => void;
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
                    <a href="#" onClick={(e) => handleNavClick(e, '#tool')} className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                        <span style={{ fontSize: '1.5rem' }}>🎯</span>
                        <span className="gradient-text font-heading text-xl md:text-2xl font-extrabold m-0">LFI Pro</span>
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