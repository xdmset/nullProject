import React from 'react';

// --- Rutas de importación corregidas ---
// Ahora subimos dos niveles (../../) para llegar a la carpeta 'src'
import AnimationRevealPage from '../../helpers/AnimationRevealPage.jsx';
import LandingHeader from '../../components/ui/LandingHeader.jsx';
import LandingFooter from '../../components/ui/LandingFooter.jsx';
import FeaturesAboutSection from '../../components/landing/FeaturesAboutSection.jsx';
import DevelopedAboutSection from '../../components/landing/DevelopedAboutSection.jsx';
import TeamAboutSection from '../../components/landing/TeamAboutSection.jsx';

// Helper component to pass props
const HighlightedText = ({ children }) => <span className="text-blue-500">{children}</span>;

export default function AboutPage({ navigate }) {
  return (
    <AnimationRevealPage>
      <LandingHeader navigate={navigate} />
      <DevelopedAboutSection
        heading={<>Uso del <HighlightedText>sistema</HighlightedText></>}
      />
      <FeaturesAboutSection
        heading={<>Características <HighlightedText>populares</HighlightedText></>}
      />
      <TeamAboutSection
        heading={<>Nuestro <HighlightedText>equipo</HighlightedText></>}
      />
      <LandingFooter />
    </AnimationRevealPage>
  );
};
