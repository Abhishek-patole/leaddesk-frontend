import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { LeadForm } from '../components/LeadForm';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center">
        <HeroSection />
        
        {/* Lead Capture Form */}
        <div id="capture-form" className="w-full max-w-4xl mx-auto px-4 pb-32">
           <LeadForm />
        </div>
      </main>
    </div>
  );
};
