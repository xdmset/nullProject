import React from 'react';
import { useNavigate } from 'react-router-dom';

// Helpers
import AnimationRevealPage from '../helpers/AnimationRevealPage.jsx';

// UI Components
import LandingHeader from '../components/ui/LandingHeader.jsx';
import LandingFooter from '../components/ui/LandingFooter.jsx';

// Page Sections
import StartMainSection from '../components/landing/StartMainSection.jsx';
import ImpactMainSection from '../components/landing/ImpactMainSection.jsx';
import ValuesMainSection from '../components/landing/ValuesMainSection.jsx';
import PopularMainSection from '../components/landing/PopularMainSection.jsx';
import TestimonyMainSection from '../components/landing/TestimonyMainSection.jsx';
import FAQMainSection from '../components/landing/FAQMainSection.jsx';

export default function MainPage() {
  const navigate = useNavigate(); // Hook para navegación

  return (
    <AnimationRevealPage>
      {/* Pasamos navigate como prop a los componentes que lo necesiten */}
      <LandingHeader navigate={navigate} />
      <StartMainSection navigate={navigate} />
      <ImpactMainSection />
      <ValuesMainSection />
      <PopularMainSection />
      <TestimonyMainSection />
      <FAQMainSection />
      <LandingFooter />
    </AnimationRevealPage>
  );
}
