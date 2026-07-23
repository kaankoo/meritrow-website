import { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import './FrictionSolver.css';

const PAINS = [
  {
    id: 'reputation',
    fear: '“What if betting on an unknown brand puts my internal reputation at risk with leadership?”',
    solutionTitle: 'Multi-Layer Pedigree Vetting & Zero-Risk Trial',
    solutionBody: 'Every MeritRow consultant undergoes rigorous background, academic, and track-record auditing. Plus, you get a 1-week zero-friction guarantee: if talent fit isn’t 100%, we swap or refund instantly.',
    stat: '100% Reputational De-risk'
  },
  {
    id: 'procurement',
    fear: '“Procurement takes 2 months to approve new vendor contracts and MSA retainers.”',
    solutionTitle: 'Flexible Enterprise-Ready Master Service Agreement',
    solutionBody: 'No heavy minimum retainers or complex multi-tier lock-ins. MeritRow operates under standard, streamlined enterprise terms so you can deploy talent in under 48 hours.',
    stat: '&lt; 48 Hours Onboarding'
  },
  {
    id: 'quality',
    fear: '“Freelance boards give me unverified resumes, and Big-4 firms staff junior analysts.”',
    solutionTitle: 'Senior Hands-On Execution Only',
    solutionBody: 'You get dedicated ex-MBB managers and senior tech leads who execute autonomously from Day 1, requiring zero hand-holding or partner oversight.',
    stat: 'Top 1% Seniority'
  }
];

export default function FrictionSolver({ onOpenContact }) {
  const [activePainId, setActivePainId] = useState('reputation');
  const activePain = PAINS.find(p => p.id === activePainId) || PAINS[0];

  return (
    <section className="friction-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge">
            <Lock size={14} />
            <span>JTBD-2 · ENTERPRISE DE-RISKING &amp; TRUST</span>
          </div>
          <h2 className="section-title">
            We Understand Your <span className="gradient-text">Enterprise Risks &amp; Doubts</span>
          </h2>
          <p className="section-subtitle">
            Hiring talent is a career-defining move. Here is how MeritRow eliminates every operational and internal risk.
          </p>
        </div>

        <div className="friction-grid">
          <div className="fears-column">
            {PAINS.map((pain) => (
              <div 
                key={pain.id}
                className={`fear-card ${activePainId === pain.id ? 'active' : ''}`}
                onClick={() => setActivePainId(pain.id)}
              >
                <div className="fear-icon-wrapper">
                  <AlertCircle size={18} className="fear-icon" />
                </div>
                <p className="fear-text">{pain.fear}</p>
              </div>
            ))}
          </div>

          <div className="solution-column">
            <div className="solution-card glass-card">
              <div className="solution-top">
                <span className="solution-badge">
                  <CheckCircle2 size={14} /> MERITROW SOLVER GUARANTEE
                </span>
                <span className="solution-stat-chip">{activePain.stat}</span>
              </div>

              <h3 className="solution-title">{activePain.solutionTitle}</h3>
              <p className="solution-body">{activePain.solutionBody}</p>

              <div className="solution-footer">
                <button className="btn btn-primary btn-md" onClick={onOpenContact}>
                  <span>Discuss Your Project Risk-Free</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
