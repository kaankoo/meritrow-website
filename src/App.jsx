import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign, 
  Mail, 
  Building2, 
  MapPin, 
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import avatarPm from './assets/avatar_pm_new.svg';
import avatarComms from './assets/avatar_comms_new.svg';
import avatarAnalyst from './assets/avatar_analyst_new.svg';
import './App.css';

function App() {
  const [shrunk, setShrunk] = useState(false);
  const [activeProfile, setActiveProfile] = useState(0);
  
  const [activeQuadPoint, setActiveQuadPoint] = useState(1);

  const [optimizeSprint, setOptimizeSprint] = useState(false);
  const [activeCommsMilestone, setActiveCommsMilestone] = useState(2);
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('sales');

  const [numConsultants, setNumConsultants] = useState(3);
  const [numWeeks, setNumWeeks] = useState(12);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    roleNeed: 'project-manager',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const scrollerRef = useRef(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShrunk(true);
      } else {
        setShrunk(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollerScroll = () => {
    if (!scrollerRef.current) return;
    const scroller = scrollerRef.current;
    const cardWidth = scroller.querySelector('.profile-card-wrapper')?.offsetWidth || 390;
    const gap = 40;
    const scrollLeft = scroller.scrollLeft;
    
    const index = Math.round(scrollLeft / (cardWidth + gap));
    if (index >= 0 && index < 3) {
      setActiveProfile(index);
    }
  };

  const scrollToProfile = (index) => {
    if (!scrollerRef.current) return;
    const scroller = scrollerRef.current;
    const cardWidth = scroller.querySelector('.profile-card-wrapper')?.offsetWidth || 390;
    const gap = 40;
    scroller.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
    setActiveProfile(index);
  };

  const handleMouseMove = (e, index) => {
    const card = cardRefs[index].current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs[index].current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const bigFirmCost = numConsultants * 12000 * numWeeks;
  const meritRowCost = numConsultants * 4000 * numWeeks;
  const savings = bigFirmCost - meritRowCost;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.company) {
      setFormError('Please fill out all required fields.');
      return;
    }
    setFormError('');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
    } catch (err) {
      console.log('Lead submitted:', formState);
    }
    setFormSubmitted(true);
  };

  const milestones = [
    { label: 'Scope', title: 'Scope & Prep', adopt: 0, text: 'MAPPED 12-COUNTRY STAKEHOLDERS; ALIGNED LOCAL LEADERS.' },
    { label: 'Pilot', title: 'Local Pilot', adopt: 25, text: 'LAUNCHED Pilot in Germany; SECURED 90% ADOPTION RAMP.' },
    { label: 'Launch', title: 'Global Rollout', adopt: 95, text: 'DEPOLOYED SYSTEMS ACROSS APAC & EMEA; MINIMAL DOWNTIME.' },
    { label: 'Support', title: 'Governance & Audits', adopt: 98, text: 'TRANSFERRED ownership to internal BAU teams.' }
  ];

  const points = [
    { 
      id: 0, 
      label: 'Big Consulting (Tier 1)', 
      color: '#ef4444',
      coords: { bottom: '75%', left: '15%' }, 
      title: 'Legacy Tier 1 Firms',
      description: 'Extremely high caliber pedigree but comes with bloated teams, high margins (300% markup), and slow structural overhead.'
    },
    { 
      id: 1, 
      label: 'MeritRow Talent', 
      color: 'var(--primary)',
      coords: { bottom: '85%', left: '80%' }, 
      title: 'MeritRow Proposition',
      description: 'Direct matches with top 1% independent professionals. High pedigree, flat affordable pricing, and fast generalist agility.'
    },
    { 
      id: 2, 
      label: 'Cheap Outsourcing', 
      color: '#f59e0b',
      coords: { bottom: '20%', left: '75%' }, 
      title: 'Cheap Outsourcing Vendors',
      description: 'Low raw hourly billing, but demands constant hand-holding, lacks communications skills, and incurs high management overhead.'
    }
  ];

  return (
    <>
      <nav className={`navbar ${shrunk ? 'shrunk' : ''}`}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon">
            <div className="logo-inner"></div>
          </div>
          <span>Merit<span style={{ color: 'var(--primary)' }}>Row</span></span>
        </div>
        
        <div className="nav-links">
          <a href="#matrix" className="nav-link">Quadrant Comparison</a>
          <a href="#profiles" className="nav-link">Merit Profiles</a>
          <a href="#savings" className="nav-link">Savings ROI</a>
          <a href="#process" className="nav-link">How it Works</a>
          <button className="cta-button-nav" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Connect Now
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge scroll-reveal">
          <div className="badge-dot"></div>
          <span>iOS Design Philosophy &bull; B2B Boutique Consulting</span>
        </div>
        <h1 className="hero-title gradient-text scroll-reveal">
          Tier 1 Pedigree.<br />Autonomous Executions.
        </h1>
        <p className="hero-subtitle scroll-reveal">
          Accelerate deliveries with ex-McKinsey, BCG, and Big 4 generalists. Direct alignment, flat rates, and zero fat agency margins.
        </p>
        
        <div className="hero-ctas scroll-reveal">
          <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Find Talent <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('matrix').scrollIntoView({ behavior: 'smooth' })}>
            View Market Matrix
          </button>
        </div>
      </section>

      <section id="matrix" className="scroll-reveal">
        <div className="section-header">
          <span className="section-tag">Market Mapping</span>
          <h2 className="section-title">The Boutique Consulting Matrix</h2>
          <p className="section-subtitle">
            See where MeritRow positions itself: the ultimate quadrant of high-caliber pedigree and optimal cost savings.
          </p>
        </div>

        <div className="quadrant-container">
          <div className="quadrant-chart-wrapper glass">
            <div className="quadrant-chart-grid">
              <div className="axis-y"></div>
              <div className="axis-x"></div>
              
              <span className="axis-label label-top">Top 1% Pedigree & Flex</span>
              <span className="axis-label label-bottom">Rigid / Limited Talent</span>
              <span className="axis-label label-left">High Cost</span>
              <span className="axis-label label-right">Low Cost</span>

              <span className="quad-title quad-top-left">Expensive Experts</span>
              <span className="quad-title quad-top-right">Elite (MeritRow)</span>
              <span className="quad-title quad-bottom-left">Bloated Legacy</span>
              <span className="quad-title quad-bottom-right">Risky / Technical Only</span>

              {points.map((pt) => (
                <div 
                  key={pt.id}
                  className={`chart-point ${pt.id === 1 ? 'meritrow-point' : ''}`}
                  style={{ 
                    bottom: pt.coords.bottom, 
                    left: pt.coords.left,
                    color: pt.color
                  }}
                  onClick={() => setActiveQuadPoint(pt.id)}
                  onMouseEnter={() => setActiveQuadPoint(pt.id)}
                >
                  <div className="point-dot"></div>
                  <div className="point-label">{pt.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="quadrant-info">
            {points.map((pt) => (
              <div 
                key={pt.id}
                className={`quadrant-info-card ${activeQuadPoint === pt.id ? (pt.id === 1 ? 'quadrant-info-card active meritrow-active' : 'quadrant-info-card active') : 'quadrant-info-card'}`}
                style={{ borderLeftColor: pt.color }}
                onClick={() => setActiveQuadPoint(pt.id)}
                onMouseEnter={() => setActiveQuadPoint(pt.id)}
              >
                <h4>{pt.title}</h4>
                <p>{pt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="profiles" className="scroll-reveal">
        <div className="section-header">
          <span className="section-tag">Merit Profiles</span>
          <h2 className="section-title">High Caliber Candidates</h2>
          <p className="section-subtitle">
            Illustrating the depth and concrete quality of work our consultants deliver in key roles. Hover to see them interact.
          </p>
        </div>

        <div className="profiles-scroller-container">
          <div 
            className="profiles-scroller" 
            ref={scrollerRef}
            onScroll={handleScrollerScroll}
          >
            <div 
              className="profile-card-wrapper"
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
            >
              <div className="profile-card glass glass-hover" ref={cardRefs[0]}>
                <div className="profile-avatar-container">
                  <img src={avatarPm} alt="3D Profile of Scrum Master" />
                </div>
                
                <div className="profile-meta">
                  <span className="profile-code">Profile #PM-09</span>
                  <span className="profile-pedigree">Ex-Deloitte</span>
                </div>
                
                <h3 className="profile-role">Project Manager / Scrum Master</h3>
                <p className="profile-desc">
                  Accelerating software releases and streamlining cross-departmental operations.
                </p>

                <div className="profile-deliverable-widget">
                  <div className="widget-title">
                    <span>Sprint Burndown Chart</span>
                    <span style={{ color: optimizeSprint ? 'var(--emerald-accent)' : 'var(--primary)', fontWeight: 700 }}>
                      {optimizeSprint ? 'Completed -2d' : 'Active'}
                    </span>
                  </div>
                  <div className="pm-widget-chart">
                    <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%' }}>
                      <path d="M 10 10 L 90 40" className="pm-chart-path pm-chart-ideal" />
                      <path 
                        d={optimizeSprint ? "M 10 10 L 40 18 L 60 22 L 80 40" : "M 10 10 L 40 22 L 60 30 L 90 40"} 
                        className="pm-chart-path pm-chart-actual" 
                      />
                    </svg>
                  </div>
                  <div className="pm-widget-controls">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={optimizeSprint} 
                        onChange={() => setOptimizeSprint(!optimizeSprint)} 
                        style={{ cursor: 'pointer' }}
                      />
                      <span>Optimize Agile Sprint</span>
                    </label>
                  </div>
                </div>
                
                <div className="profile-stats">
                  <div className="stat-box">
                    <div className="stat-val gradient-text-purple">98%</div>
                    <div className="stat-lbl">On-Time</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val gradient-text-cyan">3 Days</div>
                    <div className="stat-lbl">Ramp-up</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val gradient-text-emerald">12+</div>
                    <div className="stat-lbl">Teams Led</div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="profile-card-wrapper"
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
            >
              <div className="profile-card glass glass-hover" ref={cardRefs[1]}>
                <div className="profile-avatar-container">
                  <img src={avatarComms} alt="3D Profile of Change Lead" />
                </div>
                
                <div className="profile-meta">
                  <span className="profile-code">Profile #CC-04</span>
                  <span className="profile-pedigree">Ex-BCG</span>
                </div>
                
                <h3 className="profile-role">Change & Comms Lead</h3>
                <p className="profile-desc">
                  Aligning global business units and driving corporate adoption of technology.
                </p>

                <div className="profile-deliverable-widget">
                  <div className="widget-title">
                    <span>Adoption Curve Roadmap</span>
                    <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>
                      {milestones[activeCommsMilestone].adopt}% Adopt
                    </span>
                  </div>
                  
                  <div className="comms-widget-timeline">
                    {milestones.map((ms, idx) => (
                      <div 
                        key={idx}
                        className={`timeline-step ${activeCommsMilestone === idx ? 'active' : ''}`}
                        onClick={() => setActiveCommsMilestone(idx)}
                      >
                        {ms.label}
                      </div>
                    ))}
                  </div>

                  <div className="comms-widget-content">
                    <strong>{milestones[activeCommsMilestone].title}:</strong> {milestones[activeCommsMilestone].text}
                  </div>
                </div>
                
                <div className="profile-stats">
                  <div className="stat-box">
                    <div className="stat-val gradient-text-purple">14</div>
                    <div className="stat-lbl">Countries</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val gradient-text-cyan">95%</div>
                    <div className="stat-lbl">Adoption</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val gradient-text-emerald">2k+</div>
                    <div className="stat-lbl">Stakeholders</div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="profile-card-wrapper"
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
            >
              <div className="profile-card glass glass-hover" ref={cardRefs[2]}>
                <div className="profile-avatar-container">
                  <img src={avatarAnalyst} alt="3D Profile of Data Analyst" />
                </div>
                
                <div className="profile-meta">
                  <span className="profile-code">Profile #DA-12</span>
                  <span className="profile-pedigree">Ex-EY</span>
                </div>
                
                <h3 className="profile-role">Analytics & Reporting Lead</h3>
                <p className="profile-desc">
                  Converting complex databases into unified, clean executive dashboard assets.
                </p>

                <div className="profile-deliverable-widget">
                  <div className="widget-title">
                    <span>Executive Metrics Mock</span>
                    <span style={{ color: 'var(--emerald-accent)', fontWeight: 700 }}>Saved 25h/w</span>
                  </div>
                  
                  <div className="analytics-widget-tabs">
                    {['sales', 'ops', 'churn'].map((tab) => (
                      <button 
                        key={tab}
                        className={`analytics-tab ${activeAnalyticsTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveAnalyticsTab(tab)}
                      >
                        {tab.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="analytics-widget-chart">
                    <svg viewBox="0 0 100 40" style={{ width: '100%', height: '100%' }}>
                      {activeAnalyticsTab === 'sales' && (
                        <>
                          <rect x="10" y="25" width="10" height="15" className="analytics-chart-bar" />
                          <rect x="25" y="20" width="10" height="20" className="analytics-chart-bar" />
                          <rect x="40" y="15" width="10" height="25" className="analytics-chart-bar" />
                          <rect x="55" y="10" width="10" height="30" className="analytics-chart-bar" />
                          <rect x="70" y="5" width="10" height="35" className="analytics-chart-bar" />
                        </>
                      )}
                      {activeAnalyticsTab === 'ops' && (
                        <>
                          <path d="M 10 30 L 30 25 L 50 12 L 70 18 L 90 5" fill="none" stroke="var(--emerald-accent)" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="90" cy="5" r="3.5" fill="var(--emerald-accent)" />
                        </>
                      )}
                      {activeAnalyticsTab === 'churn' && (
                        <>
                          <path d="M 10 5 L 30 10 L 50 25 L 70 28 L 90 35" fill="none" stroke="var(--emerald-accent)" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="90" cy="35" r="3.5" fill="var(--emerald-accent)" />
                        </>
                      )}
                    </svg>
                  </div>
                </div>
                
                <div className="profile-stats">
                  <div className="stat-box">
                    <div className="stat-val gradient-text-purple">25h/wk</div>
                    <div className="stat-lbl">Manual Saved</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val gradient-text-cyan">Realtime</div>
                    <div className="stat-lbl">Reports</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val gradient-text-emerald">100%</div>
                    <div className="stat-lbl">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="scroller-indicators">
            {[0, 1, 2].map((idx) => (
              <div 
                key={idx} 
                className={`indicator-dot ${activeProfile === idx ? 'active' : ''}`}
                onClick={() => scrollToProfile(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="savings" className="scroll-reveal">
        <div className="section-header">
          <span className="section-tag">Direct Savings</span>
          <h2 className="section-title">Calculate Your Cost Reductions</h2>
          <p className="section-subtitle">
            Find out how much budget you save by matching directly with top-pedigree executors instead of paying traditional consulting firm markups.
          </p>
        </div>

        <div className="calculator-container">
          <div className="calc-controls glass">
            <h3 className="calc-title"><TrendingUp size={24} style={{ color: 'var(--primary)' }} /> Scope Allocation</h3>
            
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Number of Consultants Needed</span>
                <span className="slider-val">{numConsultants}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={numConsultants} 
                onChange={(e) => setNumConsultants(parseInt(e.target.value))} 
                className="calc-slider"
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Engagement Duration (Weeks)</span>
                <span className="slider-val">{numWeeks} Weeks</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="52" 
                value={numWeeks} 
                onChange={(e) => setNumWeeks(parseInt(e.target.value))} 
                className="calc-slider"
              />
            </div>
          </div>

          <div className="calc-visual">
            <span className="savings-label">Net Cost Reductions</span>
            <div className="savings-amount gradient-text">{formatCurrency(savings)}</div>
            
            <div className="comparison-list-calc">
              <div className="calc-compare-item">
                <span>Traditional Billing Cost:</span>
                <span>{formatCurrency(bigFirmCost)}</span>
              </div>
              <div className="calc-compare-item meritrow">
                <span>MeritRow B2B Direct Cost:</span>
                <span>{formatCurrency(meritRowCost)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-reveal">
        <div className="section-header">
          <span className="section-tag">Operational Model</span>
          <h2 className="section-title">Speed of Placement</h2>
          <p className="section-subtitle">
            Get high-caliber, vetted support instantly. We have zero corporate onboarding lag.
          </p>
        </div>

        <div className="process-grid">
          <div className="process-step">
            <div className="process-number">01</div>
            <h3 className="process-step-title">Align Objectives</h3>
            <p className="process-step-text">
              We define project deliverables, roles, and necessary ex-tier-1 pedigree in a brief alignment call.
            </p>
          </div>

          <div className="process-step">
            <div className="process-number">02</div>
            <h3 className="process-step-title">Review Matches</h3>
            <p className="process-step-text">
              We present 1 or 2 matching candidate profiles within 48 hours. You review case studies and confirm.
            </p>
          </div>

          <div className="process-step">
            <div className="process-number">03</div>
            <h3 className="process-step-title">Initiate Delivery</h3>
            <p className="process-step-text">
              The consultant onboard immediately, takes over stakeholder management, and starts executing.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-reveal">
        <div className="contact-container">
          <div className="contact-info">
            <span className="section-tag">Initiate Trial</span>
            <h3>Acquire Elite Execution</h3>
            <p>
              Share your project targets, and let us match you with a pre-vetted top 1% candidate within two business days.
            </p>

            <div className="contact-perks">
              <div className="contact-perk">
                <div className="perk-icon-container">
                  <Clock size={20} />
                </div>
                <div>
                  <h4>48-Hour Matching</h4>
                  <p>First candidate match delivered within two business days.</p>
                </div>
              </div>

              <div className="contact-perk">
                <div className="perk-icon-container">
                  <Users size={20} />
                </div>
                <div>
                  <h4>Vetted ex-McKinsey/BCG/Big 4</h4>
                  <p>Pre-verified credentials, operational excellence, and stakeholder skills.</p>
                </div>
              </div>

              <div className="contact-perk">
                <div className="perk-icon-container">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4>Flexible Trials</h4>
                  <p>No long-term commitments. Cancel or scale allocation with 1-week notice.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel glass">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="e.g. Sarah Jenkins" 
                    required 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Business Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="e.g. sjenkins@company.com" 
                    required 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company Name *</label>
                  <input 
                    type="text" 
                    id="company" 
                    placeholder="e.g. Innovate Corp" 
                    required 
                    value={formState.company}
                    onChange={(e) => setFormState({...formState, company: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="role">Consultant Role Needed</label>
                  <select 
                    id="role" 
                    value={formState.roleNeed}
                    onChange={(e) => setFormState({...formState, roleNeed: e.target.value})}
                    className="form-input"
                    style={{ appearance: 'none', background: '#fff url("data:image/svg+xml;utf8,<svg fill=\'%2364748b\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 12px center' }}
                  >
                    <option value="project-manager">Project Manager / Scrum Master</option>
                    <option value="change-lead">Change & Comms Lead</option>
                    <option value="data-analyst">Analytics & Reporting Analyst</option>
                    <option value="other">Other Strategic Role</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Project Context / Scope details</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    placeholder="Briefly describe what you want the consultant to accomplish..." 
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                {formError && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <X size={16} /> {formError}
                  </p>
                )}

                <button type="submit" className="form-submit-btn">
                  Submit Request <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
                </button>
              </form>
            ) : (
              <div className="success-container">
                <div className="success-icon-wrapper">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="success-title gradient-text">Inquiry Registered</h3>
                <p className="success-text">
                  Thank you, {formState.name}. We've received your request for a {formState.roleNeed.replace('-', ' ')} at {formState.company}. A MeritRow Partner will contact you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">
              <div className="logo-inner"></div>
            </div>
            <span>MeritRow</span>
          </div>
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} MeritRow. All rights reserved. <span>meritrow.com</span>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
