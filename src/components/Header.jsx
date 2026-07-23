import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import './Header.css';

export default function Header({ onOpenContact }) {
  const [shrunk, setShrunk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setShrunk(true);
      } else {
        setShrunk(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${shrunk ? 'shrunk' : ''}`}>
      <div className="container header-content">
        <a href="#" className="brand-logo">
          <div className="logo-icon-wrapper logo-breathing">
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="header-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="#0F172A"/>
              <path d="M25 70V30L50 52L75 30V70" stroke="url(#header-logo-grad)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="22" r="5" fill="#10B981"/>
            </svg>
          </div>
          <div className="brand-text-block">
            <span className="brand-name">MeritRow</span>
            <span className="brand-tagline">Enterprise Talent Partner</span>
          </div>
        </a>

        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="#hero" className="nav-item">Overview</a>
          <a href="#matrix" className="nav-item">Why MeritRow</a>
          <a href="#calculator" className="nav-item">ROI Calculator</a>
          <a href="#talent" className="nav-item">Talent Network</a>
          <a href="#how-it-works" className="nav-item">How It Works</a>
          <a href="#faq" className="nav-item">FAQ</a>
        </nav>

        <div className="header-actions">
          <button className="btn btn-secondary btn-sm desktop-only" onClick={() => {
            const el = document.getElementById('matrix');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            Compare Models
          </button>
          <button className="btn btn-primary btn-sm" onClick={onOpenContact}>
            <span>Deploy Talent</span>
            <ArrowRight size={15} />
          </button>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#hero" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Overview</a>
          <a href="#matrix" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Why MeritRow</a>
          <a href="#calculator" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
          <a href="#talent" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Talent Network</a>
          <a href="#how-it-works" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#faq" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <button className="btn btn-vibrant btn-lg" style={{ marginTop: '1rem' }} onClick={() => {
            setMobileMenuOpen(false);
            onOpenContact();
          }}>
            Deploy Talent Now
          </button>
        </div>
      )}
    </header>
  );
}
