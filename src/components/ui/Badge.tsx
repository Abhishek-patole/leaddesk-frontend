import { cn } from './Input';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'new' | 'contacted' | 'closed' | 'default';
}

export const Badge = ({ variant = 'default', className, children, ...props }: BadgeProps) => {
  const variants = {
    new: "bg-sky-100 text-sky-800 dark:bg-sky-500/10 dark:text-sky-400 border-sky-200 dark:border-sky-500/20",
    contacted: "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    closed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    default: "bg-slate-100 text-slate-800 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
