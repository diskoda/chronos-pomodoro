import Header from '../components/landingPage/Header';
import Hero from '../components/landingPage/Hero';
import PBLSection from '../components/landingPage/PBLSection';
import GamificationSection from '../components/landingPage/GamificationSection';
import ClinicalCasesSection from '../components/landingPage/ClinicalCasesSection';
import QuestionBankSection from '../components/landingPage/QuestionBankSection';
import FlashcardsSection from '../components/landingPage/FlashcardsSection';
import InteractiveComponentsSection from '../components/landingPage/InteractiveComponentsSection';
import Footer from '../components/landingPage/Footer';

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <Hero />
      <PBLSection />
      <GamificationSection />
      <ClinicalCasesSection />
      <QuestionBankSection />
      <FlashcardsSection />
      <InteractiveComponentsSection />
      <Footer />
    </div>
  );
}