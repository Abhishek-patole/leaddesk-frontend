import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[var(--text-main)]">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-11 px-4 rounded-lg outline-none transition-all duration-200 shadow-sm",
              "bg-slate-50/80 focus:bg-white dark:bg-[#ffffff05] dark:focus:bg-[#ffffff0a] backdrop-blur-md",
              "border border-slate-300 dark:border-white/10",
              "text-[var(--text-main)] placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:ring-2 focus:ring-[var(--brand-primary)]/50 focus:border-[var(--brand-primary)] focus:shadow-md",
              icon && "pl-10",
              error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-1 animate-in slide-in-from-top-1 opacity-100">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
