import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { ValueAddedServices } from '../components/ValueAddedServices';
import { HealthPackages } from '../components/HealthPackages';
import { AboutSection } from '../components/AboutSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { BookTestModal } from '../components/BookTestModal';

export const LandingPage = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onBookTest={() => setIsBookModalOpen(true)}
        onNavigate={scrollToSection}
      />
      <HeroSection onBookTest={() => setIsBookModalOpen(true)} />
      <ServicesSection />
      <ValueAddedServices />
      <HealthPackages />
      <AboutSection />
      <FeaturesSection />
      <ContactSection />
      <Footer onNavigate={scrollToSection} />
      <BookTestModal 
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
