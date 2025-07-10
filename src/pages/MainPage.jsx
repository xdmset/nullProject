import React from 'react';

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

// Helper component to pass props, just like in the original file
const HighlightedText = ({ children }) => <span className="text-blue-500">{children}</span>;

export default function MainPage({ navigate }) {
  return (
    <AnimationRevealPage>
      <LandingHeader navigate={navigate} />
      <StartMainSection navigate={navigate} />
      <ImpactMainSection />
      <ValuesMainSection 
        heading={<>Valores <HighlightedText>del Proyecto</HighlightedText></>}
      />
      <PopularMainSection
        heading={<>Secciones <HighlightedText>populares</HighlightedText></>}
      />
      <TestimonyMainSection 
        heading={<>Lo que dicen <HighlightedText>nuestros usuarios</HighlightedText></>}
      />
      <FAQMainSection
        heading={<>Algunas <HighlightedText>preguntas ?</HighlightedText></>}
      />
      <LandingFooter />
    </AnimationRevealPage>
  );
}
