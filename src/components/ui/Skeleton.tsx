import { cn } from './Input';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-[#ffffff10]", className)}
      {...props}
    />
  );
};
