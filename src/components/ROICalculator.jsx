import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import './ROICalculator.css';

const ROLES = [
  { id: 'strategy-lead', name: 'Strategy Lead / Ex-MBB', bigFirmRate: 400, meritRowRate: 145 },
  { id: 'product-manager', name: 'Senior Product Manager', bigFirmRate: 320, meritRowRate: 125 },
  { id: 'tech-architect', name: 'Tech Lead / Architect', bigFirmRate: 350, meritRowRate: 135 },
  { id: 'business-analyst', name: 'Senior Business Analyst', bigFirmRate: 250, meritRowRate: 95 }
];

export default function ROICalculator({ onOpenContact }) {
  const [selectedRoleId, setSelectedRoleId] = useState('strategy-lead');
  const [numTalent, setNumTalent] = useState(2);
  const [durationWeeks, setDurationWeeks] = useState(12);

  const selectedRole = ROLES.find(r => r.id === selectedRoleId) || ROLES[0];

  const hoursPerWeek = 40;
  const totalHours = numTalent * durationWeeks * hoursPerWeek;

  const bigFirmCost = totalHours * selectedRole.bigFirmRate;
  const meritRowCost = totalHours * selectedRole.meritRowRate;
  const totalSavings = bigFirmCost - meritRowCost;
  const savingsPercent = Math.round((totalSavings / bigFirmCost) * 100);

  return (
    <section id="calculator" className="calculator-section section-padding">
      <div className="container">
        <div className="calculator-header text-center">
          <div className="section-badge">
            <Calculator size={14} />
            <span>JTBD-3 · REAL COST BENEFIT</span>
          </div>
          <h2 className="section-title text-white">
            Enterprise <span className="gradient-text-vibrant">ROI &amp; Cost Savings Calculator</span>
          </h2>
          <p className="section-subtitle text-inverse-muted">
            See exactly how much your organization saves by partnering with MeritRow over legacy consulting firms.
          </p>
        </div>

        <div className="calculator-box glass-card-dark">
          <div className="calculator-grid">
            <div className="calc-controls">
              <div className="calc-group">
                <label className="calc-label">Select Talent Role Profile:</label>
                <div className="role-tabs-grid">
                  {ROLES.map(role => (
                    <button
                      key={role.id}
                      className={`role-tab ${selectedRoleId === role.id ? 'active' : ''}`}
                      onClick={() => setSelectedRoleId(role.id)}
                    >
                      <span>{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-group">
                <div className="slider-header">
                  <label className="calc-label">Number of Talent Resources:</label>
                  <span className="slider-val-badge">{numTalent} {numTalent === 1 ? 'Person' : 'People'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={numTalent}
                  onChange={(e) => setNumTalent(parseInt(e.target.value))}
                  className="calc-slider"
                />
                <div className="slider-ticks">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              <div className="calc-group">
                <div className="slider-header">
                  <label className="calc-label">Engagement Duration:</label>
                  <span className="slider-val-badge">{durationWeeks} Weeks</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="52"
                  step="2"
                  value={durationWeeks}
                  onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
                  className="calc-slider"
                />
                <div className="slider-ticks">
                  <span>2 wks</span>
                  <span>26 wks (6 mos)</span>
                  <span>52 wks (1 yr)</span>
                </div>
              </div>
            </div>

            <div className="calc-results-box">
              <div className="results-badge">
                <Sparkles size={14} />
                <span>YOUR PROJECTED ENTERPRISE SAVINGS</span>
              </div>

              <div className="primary-savings-display">
                <span className="savings-currency">$</span>
                <span className="savings-amount">{totalSavings.toLocaleString()}</span>
                <span className="savings-tag">SAVED</span>
              </div>

              <div className="savings-percent-bar">
                <span className="percent-badge">{savingsPercent}% Lower Cost</span>
                <span className="percent-sub">Same Tier-1 Quality, Zero Partner Overhead</span>
              </div>

              <div className="cost-breakdown-rows">
                <div className="breakdown-row">
                  <span className="row-label">Legacy Firm Retainer Cost:</span>
                  <strong className="row-val text-muted-line">${bigFirmCost.toLocaleString()}</strong>
                </div>
                <div className="breakdown-row highlight-row">
                  <span className="row-label">MeritRow Investment:</span>
                  <strong className="row-val text-cyan">${meritRowCost.toLocaleString()}</strong>
                </div>
              </div>

              <button className="btn btn-vibrant btn-lg calc-cta" onClick={onOpenContact}>
                <span>Lock In This Rate &amp; Deploy</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
