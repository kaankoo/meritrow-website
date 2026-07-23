import { useState, useEffect, useRef } from 'react';
import { Check, X, ShieldCheck, Zap, DollarSign, ArrowUpRight, Play, Pause, RefreshCw } from 'lucide-react';
import './ComparisonMatrix.css';

const OPTIONS = [
  {
    id: 'meritrow',
    name: 'MeritRow (Top 1% Boutique)',
    tagline: 'Tier-1 Pedigree Without Big-Firm Overhead',
    badge: 'RECOMMENDED MODEL',
    isMeritRow: true,
    quadrantPos: 'Top-Right (High Pedigree, Low Overhead)',
    rate: '$95 - $160 / hr',
    percentile: 'Top 1% Vetted',
    overhead: 'Zero Partner Margins',
    speed: '24 - 48 Hours',
    pedigree: 'Ex-MBB, Ex-Big 4, Top IIT / Ivy League',
    risk: 'Zero Risk (1-Week Replacement Guarantee)',
    description: 'Direct access to senior ex-strategy consultants, tech leads, and product managers without paying for partner equity, fancy office leases, or junior analyst training.'
  },
  {
    id: 'big4',
    name: 'MBB & Big-4 Strategy Firms',
    tagline: 'Legacy Global Consultancies',
    badge: 'TRADITIONAL MODEL',
    isMeritRow: false,
    quadrantPos: 'Top-Left (High Pedigree, Extreme Overhead)',
    rate: '$350 - $650 / hr',
    percentile: 'Top 5% Brand Name',
    overhead: '300%+ Partner Margin',
    speed: '4 - 8 Weeks Procurement',
    pedigree: 'Top Tier-1 (often staffed with junior analysts)',
    risk: 'High Procurement & Minimum Retainer Commitment',
    description: 'Exceptional brand name recognition, but bloated with partner overhead, massive procurement delays, and heavy pyramid staffing where junior associates do the bulk execution.'
  },
  {
    id: 'freelance',
    name: 'Freelance Platforms & Gig Boards',
    tagline: 'Self-Serve Gig Marketplaces',
    badge: 'SELF-SERVE MARKET',
    isMeritRow: false,
    quadrantPos: 'Bottom-Right (Variable Pedigree, Low Overhead)',
    rate: '$60 - $140 / hr',
    percentile: 'Unverified / Variable',
    overhead: 'Low Overhead',
    speed: '1 - 2 Weeks Vetting',
    pedigree: 'Variable / Self-Reported',
    risk: 'High Reputational Risk & Screening Overhead',
    description: 'Requires your team to spend dozens of hours screening self-promoted resumes with zero quality guarantees or enterprise accountability.'
  },
  {
    id: 'in-house',
    name: 'In-House Recruiting & Contracting',
    tagline: 'Internal Talent Acquisition',
    badge: 'SLOW INTERNAL PROCESS',
    isMeritRow: false,
    quadrantPos: 'Bottom-Left (Average Pedigree, High Time Cost)',
    rate: '$120 - $200 / hr (Loaded)',
    percentile: 'Mid Tier',
    overhead: 'Internal Recruiter & Benefits Cost',
    speed: '60 - 90 Days Hiring Cycle',
    pedigree: 'Limited to active job seekers',
    risk: 'Long-term severance & permanent overhead',
    description: 'Requires heavy HR bandwidth, expensive recruiter fees, and months of waiting while key strategic initiatives remain stalled.'
  }
];

export default function ComparisonMatrix({ onOpenContact }) {
  const [activeId, setActiveId] = useState('meritrow');
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const activeOption = OPTIONS.find(o => o.id === activeId) || OPTIONS[0];

  useEffect(() => {
    if (isPaused) {
      setProgress(0);
      return;
    }

    const intervalTime = 4000;
    const stepTime = 50;
    let elapsed = 0;

    timerRef.current = setInterval(() => {
      elapsed += stepTime;
      setProgress((elapsed / intervalTime) * 100);

      if (elapsed >= intervalTime) {
        elapsed = 0;
        setActiveId(prev => {
          const idx = OPTIONS.findIndex(o => o.id === prev);
          const nextIdx = (idx + 1) % OPTIONS.length;
          return OPTIONS[nextIdx].id;
        });
      }
    }, stepTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeId]);

  return (
    <section id="matrix" className="matrix-section section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={14} />
            <span>JTBD-3 · MARKET DIFFERENTIATION</span>
          </div>
          <h2 className="section-title">
            The Talent Quadrant &amp; <span className="gradient-text">Value Matrix</span>
          </h2>
          <p className="section-subtitle">
            See how MeritRow compares against traditional MBB consultancies, self-serve gig boards, and internal hiring cycles.
          </p>
        </div>

        <div className="autoplay-control-bar">
          <div className="autoplay-progress-track">
            <div 
              className="autoplay-progress-fill" 
              style={{ width: `${isPaused ? 0 : progress}%` }}
            ></div>
          </div>
          <div className="autoplay-status">
            <button 
              className="btn-pause-toggle" 
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{isPaused ? "Paused (Hovered/Clicked)" : "Autoplaying Options"}</span>
            </button>
          </div>
        </div>

        <div 
          className="matrix-grid"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="quadrant-card glass-card">
            <div className="quadrant-chart-header">
              <span className="chart-title">Pedigree vs. Cost Overhead Chart</span>
              <span className="chart-hint">Click any card to inspect comparison</span>
            </div>

            <div className="quadrant-area">
              <div className="axis-label y-axis">
                <span>HIGHER TALENT QUALITY &amp; PEDIGREE &rarr;</span>
              </div>

              <div className="axis-label x-axis">
                <span>HIGHER OVERHEAD &amp; COST &rarr;</span>
              </div>

              <div className="quadrant-box-container">
                <div 
                  className={`quadrant-box box-tl ${activeId === 'big4' ? 'active' : ''}`}
                  onClick={() => setActiveId('big4')}
                >
                  <span className="box-tag">High Pedigree / High Cost</span>
                  <strong className="box-name">MBB &amp; Big-4</strong>
                  <span className="box-stat">$350 - $650/hr</span>
                </div>

                <div 
                  className={`quadrant-box box-tr box-star ${activeId === 'meritrow' ? 'active' : ''}`}
                  onClick={() => setActiveId('meritrow')}
                >
                  <div className="box-star-badge">TOP 1% SWEET SPOT</div>
                  <strong className="box-name">MeritRow</strong>
                  <span className="box-sub">Top 1% Talent • Low Overhead</span>
                  <span className="box-stat highlight">$95 - $160/hr</span>
                </div>

                <div 
                  className={`quadrant-box box-bl ${activeId === 'in-house' ? 'active' : ''}`}
                  onClick={() => setActiveId('in-house')}
                >
                  <span className="box-tag">Low Speed / High Admin</span>
                  <strong className="box-name">In-House Hiring</strong>
                  <span className="box-stat">60-90 Days to Hire</span>
                </div>

                <div 
                  className={`quadrant-box box-br ${activeId === 'freelance' ? 'active' : ''}`}
                  onClick={() => setActiveId('freelance')}
                >
                  <span className="box-tag">Variable Quality / Unverified</span>
                  <strong className="box-name">Freelance Platforms</strong>
                  <span className="box-stat">Self-Reported Vetting</span>
                </div>
              </div>
            </div>
          </div>

          <div className="comparison-panel-wrapper">
            {activeOption.isMeritRow ? (
              <div className="glass-card-dark meritrow-proposition-card">
                <div className="prop-header">
                  <div className="prop-badge">
                    <ShieldCheck size={14} />
                    <span>{activeOption.badge}</span>
                  </div>
                  <h3 className="prop-title">{activeOption.name}</h3>
                  <p className="prop-tagline">{activeOption.tagline}</p>
                </div>

                <div className="prop-stats-grid">
                  <div className="prop-stat-box">
                    <span className="prop-stat-label">Hourly Rate</span>
                    <strong className="prop-stat-val text-cyan">{activeOption.rate}</strong>
                  </div>
                  <div className="prop-stat-box">
                    <span className="prop-stat-label">Talent Vetting</span>
                    <strong className="prop-stat-val text-emerald">{activeOption.percentile}</strong>
                  </div>
                  <div className="prop-stat-box">
                    <span className="prop-stat-label">Deployment Speed</span>
                    <strong className="prop-stat-val text-gold">{activeOption.speed}</strong>
                  </div>
                  <div className="prop-stat-box">
                    <span className="prop-stat-label">Overhead</span>
                    <strong className="prop-stat-val text-purple">{activeOption.overhead}</strong>
                  </div>
                </div>

                <div className="prop-description">
                  <p>{activeOption.description}</p>
                </div>

                <div className="prop-features-list">
                  <div className="prop-feature"><Check size={16} className="text-emerald" /> <span>Top-tier academic &amp; corporate pedigree</span></div>
                  <div className="prop-feature"><Check size={16} className="text-emerald" /> <span>Autonomous execution, zero partner bloat</span></div>
                  <div className="prop-feature"><Check size={16} className="text-emerald" /> <span>No long-term procurement lock-in</span></div>
                </div>

                <button className="btn btn-vibrant btn-lg prop-cta" onClick={onOpenContact}>
                  <span>Deploy MeritRow Talent Now</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ) : (
              <div className="glass-card comparison-regular-card">
                <div className="regular-header">
                  <span className="regular-badge">{activeOption.badge}</span>
                  <h3 className="regular-title">{activeOption.name}</h3>
                  <p className="regular-tagline">{activeOption.tagline}</p>
                </div>

                <div className="regular-specs-list">
                  <div className="spec-row">
                    <span className="spec-label">Typical Hourly Rate</span>
                    <strong className="spec-value text-primary">{activeOption.rate}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Talent Quality Vetting</span>
                    <strong className="spec-value">{activeOption.percentile}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Onboarding &amp; Speed</span>
                    <strong className="spec-value">{activeOption.speed}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Firm Overhead Cost</span>
                    <strong className="spec-value text-red">{activeOption.overhead}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Reputational Risk</span>
                    <strong className="spec-value">{activeOption.risk}</strong>
                  </div>
                </div>

                <div className="regular-body">
                  <p>{activeOption.description}</p>
                </div>

                <div className="compare-switch-cta">
                  <span>Looking for tier-1 quality without this overhead?</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveId('meritrow')}>
                    Switch to MeritRow View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
