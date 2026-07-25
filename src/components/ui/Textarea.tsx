import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from './Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {label}
        </label>
        <div className="relative">
          <textarea
            ref={ref}
            className={cn(
              "w-full p-4 rounded-lg outline-none transition-all duration-200 resize-y min-h-[120px] shadow-sm",
              "bg-slate-50/80 focus:bg-white dark:bg-[#ffffff05] dark:focus:bg-[#ffffff0a] backdrop-blur-md",
              "border border-slate-300 dark:border-white/10",
              "text-[var(--text-main)] placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:ring-2 focus:ring-[var(--brand-primary)]/50 focus:border-[var(--brand-primary)] focus:shadow-md",
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

Textarea.displayName = 'Textarea';
