import Header from '../components/landingPage/Header';
import Hero from '../components/landingPage/Hero';

export default function Home() {
  return (
    <div className="min-h-screen theme-bg-secondary">
      <Header />
      <Hero />
    </div>
  );
}