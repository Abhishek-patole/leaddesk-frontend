import { Sparkles, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Animated Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-md mb-8 animate-in slide-in-from-bottom-4 duration-700 fade-in transition-colors">
          <Sparkles size={14} className="text-[var(--brand-primary)]" />
          <span className="text-sm font-medium text-[var(--text-main)]">
            Introducing Lead Engine v1.0
          </span>
          <div className="h-4 w-[1px] bg-[var(--border-color)] mx-1"></div>
          <span className="text-sm text-[var(--brand-primary)] hover:text-[var(--brand-hover)] cursor-pointer flex items-center gap-1 transition-colors">
            Read the launch post <ArrowRight size={12} />
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-main)] mb-6 animate-in slide-in-from-bottom-6 duration-700 fade-in delay-150 fill-mode-both max-w-4xl transition-colors">
          Convert Leads Faster with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[var(--brand-primary)] dark:to-purple-500">
            Precision Analytics.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl text-lg sm:text-xl text-[var(--text-muted)] mb-10 animate-in slide-in-from-bottom-8 duration-700 fade-in delay-300 fill-mode-both transition-colors">
          Capture, qualify, and convert your most valuable prospects instantly. 
          Built with cutting-edge speed and seamless design to maximize your conversion rate.
        </p>

        {/* Social Proof / Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-in fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[var(--text-main)]">99.9%</span>
            <span className="text-sm text-[var(--text-muted)]">Uptime SLA</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[var(--text-main)]">&lt;50ms</span>
            <span className="text-sm text-[var(--text-muted)]">Capture Latency</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[var(--text-main)]">256-bit</span>
            <span className="text-sm text-[var(--text-muted)]">AES Encryption</span>
          </div>
        </div>

      </div>
    </div>
  );
};
