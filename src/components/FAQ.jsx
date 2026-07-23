import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQS = [
  {
    q: 'How does MeritRow verify talent pedigree and quality?',
    a: 'We evaluate candidates through a strict 4-stage process: verified employment audit (ex-MBB, ex-Big 4, tier-1 tech), academic background verification (top engineering/business institutes), live problem-solving case study, and reference checks from former enterprise executives.'
  },
  {
    q: 'What is the risk-free trial policy?',
    a: 'We offer a 1-week trial period for every new talent placement. If you feel the candidate isn’t a 100% fit during the first week, we will immediately replace the talent or issue a full refund with zero cancellation fees.'
  },
  {
    q: 'How quickly can MeritRow talent start on my project?',
    a: 'In most cases, we match and introduce hand-selected profiles within 24 hours of your initial request. Once approved, talent can begin active execution within 48 hours.'
  },
  {
    q: 'How are MeritRow rates 50-70% lower than traditional consultancies?',
    a: 'Traditional consulting firms charge massive markups (up to 300%) to pay for senior partner equity, prime real estate offices, and massive recruitment overhead. MeritRow operates a lean, boutique model that passes those savings directly to client organizations while ensuring talent receives top-market compensation.'
  },
  {
    q: 'What engagement models are available?',
    a: 'We support flexible full-time dedicated embeds, fractional strategic leads (10-20 hours/week), and project-based deliverables. You can adjust duration or scale team size up/down as your project needs evolve.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge">
            <HelpCircle size={14} />
            <span>JTBD-2 &amp; JTBD-4 · FAQ &amp; DE-RISKING</span>
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about working with MeritRow enterprise talent.
          </p>
        </div>

        <div className="faq-accordion-container">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item glass-card ${openIndex === idx ? 'open' : ''}`}
              onClick={() => toggleFAQ(idx)}
            >
              <div className="faq-question-row">
                <h3 className="faq-question-text">{faq.q}</h3>
                <button className="faq-toggle-icon" aria-label="Toggle answer">
                  {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {openIndex === idx && (
                <div className="faq-answer-row">
                  <p className="faq-answer-text">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
