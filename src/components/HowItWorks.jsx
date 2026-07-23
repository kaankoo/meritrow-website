import { Zap, Target, UserCheck, Rocket } from 'lucide-react';
import './HowItWorks.css';

const STEPS = [
  {
    num: '01',
    icon: Target,
    title: 'Define Your Scope & Profile',
    desc: 'Share your business objective, required pedigree, and timeline. No heavy procurement docs needed.'
  },
  {
    num: '02',
    icon: UserCheck,
    title: 'Receive Matched Profiles in 24 Hours',
    desc: 'Review 2-3 hand-selected, pre-vetted top-1% generalist or specialist candidates tailored to your exact project.'
  },
  {
    num: '03',
    icon: Zap,
    title: 'Instant Intro & Trial Week',
    desc: 'Conduct a quick 20-minute alignment call and kick off your zero-risk 1-week evaluation period.'
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Autonomous Execution',
    desc: 'Talent embeds seamlessly into your team and executes with high autonomy, reporting directly to you.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge">
            <Zap size={14} />
            <span>JTBD-4 · LOW-FRICTION CONVERSION</span>
          </div>
          <h2 className="section-title">
            How MeritRow <span className="gradient-text">Deploys Talent</span>
          </h2>
          <p className="section-subtitle">
            From initial scoping to active execution in under 48 hours.
          </p>
        </div>

        <div className="steps-grid">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="step-card glass-card">
                <div className="step-number">{step.num}</div>
                <div className="step-icon-box">
                  <Icon size={24} className="step-icon" />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
