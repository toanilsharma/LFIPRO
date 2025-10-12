import React from 'react';

interface FooterProps {
    onNavigate: (view: 'tool' | 'contact' | 'cookie') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    // FIX: Corrected the type for `href` to include `#tool` instead of `tool`.
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: '#tool' | 'contact' | 'cookie' | '#features' | '#faq') => {
        e.preventDefault();

        if (href === 'contact' || href === 'cookie') {
            onNavigate(href);
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
    };

    return (
        <footer id="footer" className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">LFI Pro</h3>
                        <p className="text-gray-400">Your assistant for creating world-class, actionable learning from incident document.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#tool" onClick={(e) => handleNavClick(e, '#tool')} className="text-gray-400 hover:text-white">The Tool</a></li>
                            <li><a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="text-gray-400 hover:text-white">Features</a></li>
                            <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="text-gray-400 hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                         <h3 className="font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'cookie')} className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">About</h3>
                        <p className="text-gray-400">This tool was envisioned to empower every organization to build a robust institutional memory and foster a true culture of learning and safety.</p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
                    <p>&copy; 2024 LFI Pro. All Rights Reserved. | <span className="text-blue-400">Created by Anil Sharma</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;