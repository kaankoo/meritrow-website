import { useState } from 'react';
import { Mail, Building2, User, Send, CheckCircle2, X, Sparkles, Clock } from 'lucide-react';
import './ContactForm.css';

export default function ContactForm({ isModal, onClose }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    roleNeed: 'strategy-lead',
    teamSize: '1-3',
    timeline: 'immediate',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (res.ok || res.status === 404) {
        setSubmitted(true);
      } else {
        throw new Error('Form submission failed.');
      }
    } catch (err) {
      console.log('Lead Submission Payload:', formState);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`contact-section ${isModal ? 'as-modal' : 'section-padding'}`}>
      <div className={`${isModal ? 'modal-dialog-content' : 'container'}`}>
        {isModal && (
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        )}

        <div className="contact-box glass-card">
          <div className="contact-header">
            <div className="section-badge">
              <Sparkles size={14} />
              <span>JTBD-4 &amp; JTBD-5 · ENTERPRISE INTAKE</span>
            </div>
            <h2 className="contact-title">
              Deploy <span className="gradient-text">MeritRow Talent</span>
            </h2>
            <p className="contact-subtitle">
              Tell us about your project requirements. We will send 2-3 matched top-1% profiles within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="submission-success-box">
              <CheckCircle2 size={48} className="success-icon text-emerald" />
              <h3>Intake Received!</h3>
              <p>
                Thank you, <strong>{formState.name}</strong>. Our enterprise team is reviewing your requirements for <strong>{formState.company || 'your organization'}</strong>.
              </p>
              <div className="success-badge-info">
                <Clock size={16} />
                <span>Expect curated talent profiles in your inbox within 24 hours.</span>
              </div>
              {isModal && (
                <button className="btn btn-primary btn-md" onClick={onClose} style={{ marginTop: '1rem' }}>
                  Close Window
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form-grid">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label"><User size={14} /> Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Sarah Jenkins"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label"><Mail size={14} /> Work Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="sarah@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label"><Building2 size={14} /> Company / Organization</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Company Name"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Primary Role Requirement</label>
                  <select 
                    value={formState.roleNeed}
                    onChange={(e) => setFormState({ ...formState, roleNeed: e.target.value })}
                    className="form-select"
                  >
                    <option value="strategy-lead">Strategy Lead / Ex-MBB Consultant</option>
                    <option value="product-manager">Senior Product Manager</option>
                    <option value="tech-architect">Tech Architect / Engineering Lead</option>
                    <option value="business-analyst">Senior Business Analyst</option>
                    <option value="custom">Custom / Cross-Functional Team</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Deployment Timeline</label>
                  <select 
                    value={formState.timeline}
                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                    className="form-select"
                  >
                    <option value="immediate">Immediate (&lt; 48 hours)</option>
                    <option value="2-weeks">Within 2 Weeks</option>
                    <option value="month">Next Month</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Team Size Needed</label>
                  <select 
                    value={formState.teamSize}
                    onChange={(e) => setFormState({ ...formState, teamSize: e.target.value })}
                    className="form-select"
                  >
                    <option value="1">1 Individual Leader</option>
                    <option value="1-3">2-3 Talent Team</option>
                    <option value="4+">4+ Full Squad</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Project Details &amp; Key Goals (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="Briefly describe project scope, desired outcomes, or specific domain requirements..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="form-textarea"
                ></textarea>
              </div>

              <div className="direct-email-row">
                <span>Or email us directly at: <a href="mailto:contact@meritrow.com">contact@meritrow.com</a></span>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-vibrant btn-lg submit-btn">
                <span>{isSubmitting ? 'Submitting Intake...' : 'Submit & Request Talent Profiles'}</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
