
import React, { useState } from 'react';

interface HeaderProps {
    onNavigate: (view: 'tool' | 'contact' | 'cookie') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
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
            // Delay scrolling to allow the view to switch back to the main tool if needed
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
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-4 lg:px-6 py-4">
                <div className="flex flex-wrap justify-between items-center">
                    <a href="#" onClick={(e) => handleNavClick(e, '#tool')} className="flex items-center space-x-2">
                        <span className="text-2xl font-bold gradient-text">🎯</span>
                        <span className="text-xl font-extrabold text-gray-800 self-center whitespace-nowrap">LFI Pro</span>
                    </a>
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">{link.text}</a>
                        ))}
                    </div>
                    <a href="#tool" onClick={(e) => handleNavClick(e, '#tool')} className="hidden lg:inline-block px-6 py-2.5 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform" style={{ backgroundImage: 'var(--gradient-1)' }}>
                        Get Started
                    </a>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 space-y-2">
                        {navLinks.map(link => (
                             <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block py-2 px-3 text-gray-600 hover:bg-indigo-50 rounded-md">{link.text}</a>
                        ))}
                        <a href="#tool" onClick={(e) => handleNavClick(e, '#tool')} className="block mt-2 w-full text-center px-6 py-2.5 text-white font-semibold rounded-lg shadow-lg" style={{ backgroundImage: 'var(--gradient-1)' }}>
                            Get Started
                        </a>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;