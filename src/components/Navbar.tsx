import { Link } from 'react-router-dom';
import { Activity, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Navbar = () => {
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean>(true);

  // Optional: Check backend health on mount to show a live indicator
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.get('/health');
        setIsBackendHealthy(true);
      } catch {
        setIsBackendHealthy(false);
      }
    };
    checkHealth();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md shadow-[var(--glass-shadow)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold shadow-lg shadow-[var(--brand-primary)]/20 transition-transform group-hover:scale-105">
            L
          </div>
          <span className="font-semibold text-lg tracking-tight text-[var(--text-main)] transition-colors">
            LeadDesk
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* Health Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--text-muted)]" title={isBackendHealthy ? 'Systems Operational' : 'Systems Offline'}>
            {isBackendHealthy ? (
              <Activity size={18} className="text-emerald-500 animate-pulse" />
            ) : (
              <Activity size={18} className="text-red-500" />
            )}
          </div>

          <div className="h-4 w-[1px] bg-[var(--border-color)] hidden sm:block"></div>

          {/* Admin Login Link */}
          <Link 
            to="/admin/login"
            className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
          >
            <ShieldCheck size={16} />
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
};
