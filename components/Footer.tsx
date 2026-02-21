import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
    onNavigate: (view: 'tool' | 'contact' | 'cookie') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: '#tool' | 'contact' | 'cookie' | '#features' | '#faq') => {
        e.preventDefault();

        if (href === 'contact' || href === 'cookie') {
            onNavigate(href);
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
    };

    return (
        <footer id="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem', padding: '4rem 0', background: 'rgba(0,0,0,0.2)' }}>
            <div className="container">
                <div className="grid md:grid-cols-4 gap-8 mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>LFI Pro</h3>
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
                            <li><a href="#" className="hover:text-white" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Us</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'cookie')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>Mission</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Empowering organizations to build robust institutional memory and foster a culture of learning and safety.</p>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>&copy; 2026 LFI Pro. All Rights Reserved. | <span className="gradient-text" style={{ fontWeight: 600 }}>Created by Anil Sharma</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;