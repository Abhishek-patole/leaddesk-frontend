import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from './Input';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-[var(--brand-primary)] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] focus:ring-[var(--brand-primary)] dark:focus:ring-offset-[#010102] transition-all duration-200",
      secondary: "bg-slate-100 dark:bg-[#ffffff0a] text-[var(--text-main)] border border-[var(--border-color)] shadow-sm hover:bg-slate-200 dark:hover:bg-[#ffffff15]",
      outline: "border border-[var(--border-color)] text-[var(--text-main)] shadow-sm hover:bg-slate-100 dark:hover:bg-white/5",
      ghost: "text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-white/5",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
