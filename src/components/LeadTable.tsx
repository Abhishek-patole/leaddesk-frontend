import { Trash2 } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Skeleton } from './ui/Skeleton';
import { useState } from 'react';

export type LeadStatus = 'New' | 'Contacted' | 'Closed';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  onStatusChange: (id: string, newStatus: LeadStatus) => void;
  onDeleteClick: (lead: Lead) => void;
}

const statusVariants: Record<LeadStatus, 'new' | 'contacted' | 'closed'> = {
  New: 'new',
  Contacted: 'contacted',
  Closed: 'closed',
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const LeadTable = ({ leads, isLoading, onStatusChange, onDeleteClick }: LeadTableProps) => {
  const [expandedLeadIds, setExpandedLeadIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedLeadIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mobile Card View
  const MobileCard = ({ lead }: { lead: Lead }) => (
    <div className="bg-[var(--bg-card)] dark:bg-[#ffffff05] border border-[var(--border-color)] rounded-xl p-4 flex flex-col gap-3 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-[var(--text-main)]">{lead.name}</h3>
          <a href={`mailto:${lead.email}`} className="text-sm text-[var(--brand-primary)] hover:underline">
            {lead.email}
          </a>
        </div>
        <Badge variant={statusVariants[lead.status]}>{lead.status}</Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-[var(--text-muted)] block text-xs">Budget</span>
          <span className="font-medium text-[var(--text-main)]">{lead.budget}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-xs">Date</span>
          <span className="font-medium text-[var(--text-main)]">{formatDate(lead.createdAt)}</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[var(--text-muted)] text-xs">Message</span>
          <span className="text-[10px] text-[var(--brand-primary)]">
            {expandedLeadIds[lead._id] ? 'Click to collapse' : 'Click to read full'}
          </span>
        </div>
        <p 
          onClick={() => toggleExpand(lead._id)}
          className={`text-sm text-[var(--text-main)] bg-slate-50 dark:bg-[#ffffff05] p-2.5 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-[#ffffff0a] transition-all ${
            expandedLeadIds[lead._id] ? 'whitespace-normal break-words' : 'line-clamp-2'
          }`}
        >
          {lead.message}
        </p>
      </div>
      
      <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[var(--border-color)]">
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(lead._id, e.target.value as LeadStatus)}
          className="flex-1 bg-slate-50 dark:bg-[#ffffff05] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          onClick={() => onDeleteClick(lead)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors focus:outline-none"
          aria-label="Delete Lead"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--bg-card)] dark:bg-[#ffffff02]">
        <p className="text-[var(--text-muted)]">No leads found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="flex flex-col gap-4 md:hidden">
        {leads.map(lead => <MobileCard key={lead._id} lead={lead} />)}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] dark:bg-[#ffffff02] shadow-[var(--glass-shadow)]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-[#ffffff05] border-b border-[var(--border-color)] text-[var(--text-muted)]">
            <tr>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Budget</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Message</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-50/50 dark:hover:bg-[#ffffff05] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-[var(--text-main)]">{lead.name}</div>
                  <a href={`mailto:${lead.email}`} className="text-[var(--brand-primary)] hover:underline text-xs">
                    {lead.email}
                  </a>
                </td>
                <td className="px-6 py-4 text-[var(--text-main)]">{lead.budget}</td>
                <td className="px-6 py-4 text-[var(--text-muted)]">{formatDate(lead.createdAt)}</td>
                <td className="px-6 py-4 max-w-[280px]">
                  <div 
                    onClick={() => toggleExpand(lead._id)}
                    className={`cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all ${
                      expandedLeadIds[lead._id] ? 'whitespace-normal break-words bg-slate-50 dark:bg-[#ffffff05] p-2 rounded-lg' : 'truncate max-w-[240px]'
                    }`}
                    title={expandedLeadIds[lead._id] ? "Click to collapse" : "Click to read full message"}
                  >
                    {lead.message}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value as LeadStatus)}
                    className="bg-transparent text-[var(--text-main)] font-medium outline-none cursor-pointer focus:ring-1 focus:ring-[var(--brand-primary)] rounded px-1 -ml-1"
                  >
                    <option value="New" className="text-black">New</option>
                    <option value="Contacted" className="text-black">Contacted</option>
                    <option value="Closed" className="text-black">Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDeleteClick(lead)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors focus:outline-none"
                    title="Delete Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
