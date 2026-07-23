import { useRef, useState } from 'react';
import { Award, Briefcase, GraduationCap, ChevronLeft, ChevronRight, CheckCircle2, Star, Sparkles } from 'lucide-react';
import avatarPm from '../assets/avatar_pm.jpg';
import avatarComms from '../assets/avatar_comms.jpg';
import avatarAnalyst from '../assets/avatar_analyst.jpg';
import './TalentPool.css';

const TALENT_PROFILES = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Senior Product & Strategy Lead',
    experience: '9+ Years',
    avatar: avatarPm,
    pedigree: ['Ex-McKinsey', 'Ex-Google', 'IIT Bombay'],
    highlights: ['Scales products 0 to 1', 'Growth Strategy', 'P&L Ownership'],
    status: 'AVAILABLE NOW',
    fitScore: '99% Match',
    bio: 'Former McKinsey Engagement Manager & Senior PM at Google. Specializes in rapid market entry, product-led growth, and cross-functional leadership.'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Enterprise Tech Architect & Lead',
    experience: '8+ Years',
    avatar: avatarComms,
    pedigree: ['Ex-Bain & Co', 'Ex-Meta', 'Stanford Alum'],
    highlights: ['Cloud Architecture', 'Distributed Systems', 'AI/ML Integration'],
    status: 'AVAILABLE IN 48H',
    fitScore: '98% Match',
    bio: 'Ex-Bain digital advisor and former Staff Engineer at Meta. Built multi-region enterprise platforms handling billions of API requests daily.'
  },
  {
    id: 3,
    name: 'Vikramaditya Rao',
    role: 'Operations & Transformation Lead',
    experience: '11+ Years',
    avatar: avatarAnalyst,
    pedigree: ['Ex-BCG', 'Ex-Amazon', 'IIM Ahmedabad'],
    highlights: ['Supply Chain', 'Cost Optimization', 'Post-Merger Ops'],
    status: 'AVAILABLE NOW',
    fitScore: '99% Match',
    bio: 'Former BCG Principal & Director of Supply Chain at Amazon. Expert in operational restructuring, gross margin expansion, and scaling logistics.'
  }
];

export default function TalentPool({ onOpenContact }) {
  const scrollerRef = useRef(null);
  const [hoveredProfile, setHoveredProfile] = useState(null);

  const scroll = (direction) => {
    if (!scrollerRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="talent" className="talent-section section-padding">
      <div className="container">
        <div className="talent-header">
          <div className="header-left">
            <div className="section-badge">
              <Award size={14} />
              <span>JTBD-2 · PROOF OF TOP 1% TALENT</span>
            </div>
            <h2 className="section-title">
              Meet Our <span className="gradient-text">Enterprise Talent Network</span>
            </h2>
            <p className="section-subtitle">
              Pre-vetted generalists and deep domain specialists ready to integrate into your organization immediately.
            </p>
          </div>

          <div className="header-nav-buttons">
            <button className="btn-circle-nav" onClick={() => scroll('left')} title="Scroll left">
              <ChevronLeft size={20} />
            </button>
            <button className="btn-circle-nav" onClick={() => scroll('right')} title="Scroll right">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="talent-carousel-wrapper">
          <div className="talent-scroller" ref={scrollerRef}>
            {TALENT_PROFILES.map((talent) => (
              <div 
                key={talent.id} 
                className={`talent-card glass-card ${hoveredProfile === talent.id ? 'interactive-hover' : ''}`}
                onMouseEnter={() => setHoveredProfile(talent.id)}
                onMouseLeave={() => setHoveredProfile(null)}
              >
                <div className="talent-top-row">
                  <span className="status-pill">
                    <span className="pulse-dot"></span>
                    {talent.status}
                  </span>
                  <span className="fit-badge">
                    <Star size={12} className="star-icon" />
                    {talent.fitScore}
                  </span>
                </div>

                <div className="avatar-visual-box">
                  <div className="avatar-frame">
                    <img src={talent.avatar} alt={talent.name} className="avatar-img" />
                    <div className="avatar-glow"></div>
                  </div>
                  {hoveredProfile === talent.id && (
                    <div className="avatar-hi-bubble">
                      <Sparkles size={12} />
                      <span>Ready to Deploy!</span>
                    </div>
                  )}
                </div>

                <div className="talent-info">
                  <h3 className="talent-name">{talent.name}</h3>
                  <span className="talent-role">{talent.role} ({talent.experience})</span>
                  
                  <div className="pedigree-tags">
                    {talent.pedigree.map((item, idx) => (
                      <span key={idx} className="pedigree-tag">
                        <GraduationCap size={12} />
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="talent-bio">{talent.bio}</p>

                  <div className="highlights-row">
                    {talent.highlights.map((h, i) => (
                      <span key={i} className="highlight-pill">
                        <CheckCircle2 size={12} className="check-icon" /> {h}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="btn btn-secondary btn-sm card-cta-btn" onClick={onOpenContact}>
                  Request Profile Matching
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
