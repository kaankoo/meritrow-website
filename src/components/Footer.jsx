import { ShieldCheck, Mail, ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand-column">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="24" fill="#1E293B"/>
                <path d="M25 70V30L50 52L75 30V70" stroke="#38BDF8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="22" r="5" fill="#34D399"/>
              </svg>
              <span className="footer-brand-name">MeritRow</span>
            </div>

            <p className="footer-tagline">
              Enterprise-grade tier-1 talent boutique. Vetted generalists and specialists from elite universities and top corporates.
            </p>

            <div className="footer-contact-chip">
              <Mail size={14} />
              <span>contact@meritrow.com</span>
            </div>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-column-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#hero">Overview</a></li>
              <li><a href="#matrix">Comparison Matrix</a></li>
              <li><a href="#calculator">ROI Calculator</a></li>
              <li><a href="#talent">Talent Network</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-trust-column">
            <h4 className="footer-column-title">Enterprise Trust</h4>
            <div className="trust-card-mini">
              <ShieldCheck size={20} className="trust-icon text-cyan" />
              <div>
                <strong>Zero-Risk Guarantee</strong>
                <p>1-Week trial audit for every talent match with instant replacement coverage.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>&copy; {new Date().getFullYear()} MeritRow (www.meritrow.com). All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <button className="back-to-top-btn" onClick={scrollToTop} title="Back to top">
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
