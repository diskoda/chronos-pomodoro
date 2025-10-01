import Header from '../components/landingPage/Header';
import Hero from '../components/landingPage/Hero';
import PBLSection from '../components/landingPage/PBLSection';

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <Hero />
      <PBLSection />
    </div>
  );
}