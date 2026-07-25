import { Skeleton } from './ui/Skeleton';
import { cn } from './ui/Input';

interface LeadStatsProps {
  total: number;
  newLeads: number;
  contacted: number;
  closed: number;
  isLoading: boolean;
}

export const LeadStats = ({ total, newLeads, contacted, closed, isLoading }: LeadStatsProps) => {
  const stats = [
    { label: 'Total Leads', value: total, color: 'text-[var(--text-main)]' },
    { label: 'New', value: newLeads, color: 'text-sky-500' },
    { label: 'Contacted', value: contacted, color: 'text-amber-500' },
    { label: 'Closed', value: closed, color: 'text-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div 
          key={i}
          className="p-4 rounded-xl bg-[var(--bg-card)] dark:bg-[#ffffff05] border border-[var(--border-color)] shadow-[var(--glass-shadow)] flex flex-col gap-1 transition-transform hover:-translate-y-0.5"
        >
          <span className="text-sm font-medium text-[var(--text-muted)]">{stat.label}</span>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <span className={cn("text-3xl font-bold tracking-tight", stat.color)}>
              {stat.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
