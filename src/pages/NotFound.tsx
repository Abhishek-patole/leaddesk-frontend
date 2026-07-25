import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-6xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-4">
          Page Not Found
        </h2>
        
        <p className="text-[var(--text-muted)] mb-8 max-w-sm">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home size={18} />
            Go back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
