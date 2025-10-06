import Header from '../components/landingPage/Header';
import Hero from '../components/landingPage/Hero';
import QuestionBankSection from '../components/landingPage/QuestionBankSection';
import Footer from '../components/landingPage/Footer';

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <Hero />
      <QuestionBankSection />
      <Footer />
    </div>
  );
}