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

      <footer className="w-full py-6 text-center border-t border-[var(--border-color)] bg-[var(--bg-surface)] mt-auto z-10">
        <p className="text-sm text-[var(--text-muted)]">
          Built for{' '}
          <a 
            href="https://digitalheroesco.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--brand-primary)] hover:underline font-medium"
          >
            Digital Heroes Training Task
          </a>
        </p>
      </footer>
    </div>
  );
};
