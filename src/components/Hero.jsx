import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import './Hero.css';

export default function Hero({ onOpenContact }) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span className="badge-text">ENTERPRISE TIER-1 TALENT BOTIQUE</span>
          </div>

          <h1 className="hero-title">
            Tier 1 Talent.<br />
            <span className="gradient-text">Zero Big-Firm Overhead.</span>
          </h1>

          <p className="hero-description">
            MeritRow connects growth leaders and enterprise teams with vetted, top-1% generalists and specialists from elite universities and top corporates — deploying in 48 hours without partner margins.
          </p>

          <div className="hero-cta-group">
            <button className="btn btn-vibrant btn-lg" onClick={onOpenContact}>
              <span>Deploy MeritRow Talent</span>
              <ArrowRight size={18} />
            </button>
            <a href="#matrix" className="btn btn-secondary btn-lg">
              <span>Explore Comparison</span>
              <TrendingUp size={18} />
            </a>
          </div>

          <div className="hero-trust-bar">
            <span className="trust-label">Elite Talent Pedigree From:</span>
            <div className="trust-chips">
              <span className="trust-chip"><ShieldCheck size={14} className="chip-icon" /> Ex-McKinsey & Bain</span>
              <span className="trust-chip"><ShieldCheck size={14} className="chip-icon" /> Ex-Google & Meta</span>
              <span className="trust-chip"><ShieldCheck size={14} className="chip-icon" /> IIT / Ivy League</span>
              <span className="trust-chip"><ShieldCheck size={14} className="chip-icon" /> Ex-Big 4 Leaders</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="macos-window glass-card">
            <div className="macos-header">
              <div className="macos-dots">
                <span className="dot dot-close"></span>
                <span className="dot dot-min"></span>
                <span className="dot dot-max"></span>
              </div>
              <div className="macos-title">
                <Sparkles size={13} className="sparkle-icon" />
                <span>MeritRow Talent Operating Index</span>
              </div>
              <div className="macos-status">
                <span className="status-live-dot"></span> LIVE
              </div>
            </div>

            <div className="macos-body">
              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-info">
                    <span className="metric-name">Talent Vetting Rigor</span>
                    <span className="metric-subtitle">Academic & corporate pedigree audit</span>
                  </div>
                  <span className="metric-highlight gold">Top 1%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill fill-1"></div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-info">
                    <span className="metric-name">Speed to Deployment</span>
                    <span className="metric-subtitle">Vetted talent onboarded to project</span>
                  </div>
                  <span className="metric-highlight cyan">&lt; 48 Hours</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill fill-2"></div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-info">
                    <span className="metric-name">Client Cost Savings</span>
                    <span className="metric-subtitle">Vs traditional strategy firm retainers</span>
                  </div>
                  <span className="metric-highlight emerald">55% - 70%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill fill-3"></div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-info">
                    <span className="metric-name">Autonomous Execution Fit</span>
                    <span className="metric-subtitle">Seniority requiring zero micromanagement</span>
                  </div>
                  <span className="metric-highlight purple">99.4%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill fill-4"></div>
                </div>
              </div>

              <div className="macos-footer-badge">
                <CheckCircle2 size={16} className="badge-check" />
                <span>Zero Risk Trial: Swap or pause talent anytime within week 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
