import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
    onNavigate: (view: 'home' | 'tool' | 'contact' | 'cookie' | 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: '#tool' | 'contact' | 'cookie' | 'privacy' | 'terms' | '#features' | '#faq') => {
        e.preventDefault();

        if (href === 'contact' || href === 'cookie' || href === 'privacy' || href === 'terms') {
            onNavigate(href);
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
    };

    return (
        <footer id="footer" className="bg-white dark:bg-[#0B0F19] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 mt-auto w-full">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="footer-logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#4F46E5" />
                                        <stop offset="1" stopColor="#06B6D4" />
                                    </linearGradient>
                                </defs>
                                <path d="M16 2L2 9L2 23L16 30L30 23L30 9L16 2Z" fill="url(#footer-logo-gradient)" fillOpacity="0.2" stroke="url(#footer-logo-gradient)" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M16 6L6 11L6 21L16 26L26 21L26 11L16 6Z" fill="url(#footer-logo-gradient)" />
                            </svg>
                            <span className="font-heading text-2xl font-black tracking-tight text-gray-900 dark:text-white">LFILab</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                            Your intelligent assistant for creating world-class, actionable Learning From Incident (LFI) documents that drive real organizational change.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all" aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all" aria-label="LinkedIn"><Linkedin size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/30 dark:hover:text-pink-400 transition-all" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-all" aria-label="WhatsApp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 lg:col-start-7">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Product</h3>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#tool" onClick={(e) => handleNavClick(e, '#tool')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">The Tool</a></li>
                            <li><a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">Features</a></li>
                            <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Legal</h3>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'privacy')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">Privacy Policy</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'terms')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">Terms of Service</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'cookie')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">Cookie Policy</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Company</h3>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">About Us</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium">Contact Support</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-base font-medium flex items-center gap-2">
                        Created by <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-black text-xl whitespace-nowrap tracking-wide drop-shadow-sm">Anil Sharma</span>
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">
                        &copy; {new Date().getFullYear()} LFILab. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;