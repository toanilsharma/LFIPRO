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
        <footer id="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem', padding: '4rem 0', background: 'rgba(0,0,0,0.2)' }}>
            <div className="container">
                <div className="grid md:grid-cols-4 gap-8 mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>LFILab</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Your assistant for creating world-class, actionable learning from incident documents.</p>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>Quick Links</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="#tool" onClick={(e) => handleNavClick(e, '#tool')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>The Tool</a></li>
                            <li><a href="#features" onClick={(e) => handleNavClick(e, '#features')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Features</a></li>
                            <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>Legal</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'privacy')} className="hover:text-white" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'terms')} className="hover:text-white" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Us</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'cookie')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>Mission</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Empowering organizations to build robust institutional memory and foster a culture of learning and safety.</p>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', color: 'var(--text-muted)' }}>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-green-500 transition-colors" aria-label="WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                    </div>
                    <p className="text-sm">&copy; 2026 LFILab. All Rights Reserved. | <span className="gradient-text" style={{ fontWeight: 600 }}>Created by Anil Sharma</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;