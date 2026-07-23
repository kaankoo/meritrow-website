import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComparisonMatrix from './components/ComparisonMatrix';
import ROICalculator from './components/ROICalculator';
import TalentPool from './components/TalentPool';
import FrictionSolver from './components/FrictionSolver';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContact = () => setIsContactModalOpen(true);
  const closeContact = () => setIsContactModalOpen(false);

  return (
    <div className="meritrow-app">
      <Header onOpenContact={openContact} />
      <main>
        <Hero onOpenContact={openContact} />
        <ComparisonMatrix onOpenContact={openContact} />
        <ROICalculator onOpenContact={openContact} />
        <TalentPool onOpenContact={openContact} />
        <FrictionSolver onOpenContact={openContact} />
        <HowItWorks />
        <FAQ />
        <ContactForm isModal={false} />
      </main>
      <Footer />
      {isContactModalOpen && (
        <ContactForm isModal={true} onClose={closeContact} />
      )}
    </div>
  );
}
