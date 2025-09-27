import Header from '../components/landingPage/Header';
import Hero from '../components/landingPage/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <Hero />
    </div>
  );
}