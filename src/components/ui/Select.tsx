import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from './Input';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-11 px-4 pr-10 appearance-none rounded-lg outline-none transition-all duration-200 shadow-sm",
              "bg-slate-50/80 focus:bg-white dark:bg-[#ffffff05] dark:focus:bg-[#ffffff0a] backdrop-blur-md",
              "border border-slate-300 dark:border-white/10",
              "text-[var(--text-main)] invalid:text-slate-400 dark:invalid:text-slate-500",
              "focus:ring-2 focus:ring-[var(--brand-primary)]/50 focus:border-[var(--brand-primary)] focus:shadow-md",
              error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
              className
            )}
            required
            {...props}
          >
            <option value="" disabled className="text-slate-400 bg-white dark:bg-slate-900">
              Select an option
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown size={18} />
          </div>
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

Select.displayName = 'Select';
