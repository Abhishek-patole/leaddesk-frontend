import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-md text-[var(--text-main)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
          size={20}
        />
        <Moon
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === 'light' ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
          size={20}
        />
      </div>
    </button>
  );
};
