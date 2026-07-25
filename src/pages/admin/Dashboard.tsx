import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../lib/api';
import { LogOut, Search, RefreshCw } from 'lucide-react';
import { LeadStats } from '../../components/LeadStats';
import { LeadTable, type Lead, type LeadStatus } from '../../components/LeadTable';
import { Pagination } from '../../components/ui/Pagination';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

export const Dashboard = () => {
  const { logout } = useAuth();
  const { success, error: toastError } = useToast();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);
  
  // Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/api/leads');
      setLeads(data.data);
    } catch (err: any) {
      toastError(err.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    // Optimistic UI update
    const previousLeads = [...leads];
    setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
    
    try {
      await api.patch(`/api/leads/${id}`, { status: newStatus });
      success('Status updated');
    } catch (err: any) {
      // Revert on failure
      setLeads(previousLeads);
      toastError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const confirmDelete = (lead: Lead) => {
    setLeadToDelete(lead);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/api/leads/${leadToDelete._id}`);
      setLeads(leads.filter(l => l._id !== leadToDelete._id));
      success('Lead deleted successfully');
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      toastError(err.response?.data?.message || 'Failed to delete lead');
    } finally {
      setIsDeleting(false);
      setLeadToDelete(null);
    }
  };

  // Derived state for Stats & Table
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage]);
  
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const stats = useMemo(() => ({
    total: leads.length,
    newLeads: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    closed: leads.filter(l => l.status === 'Closed').length,
  }), [leads]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Admin Dashboard</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage your lead capture pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchLeads} 
            className="p-2 text-[var(--text-muted)] hover:text-[var(--brand-primary)] bg-[var(--bg-card)] dark:bg-[#ffffff05] border border-[var(--border-color)] rounded-lg transition-colors focus:outline-none"
            title="Refresh Leads"
            disabled={isLoading}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <Button variant="secondary" onClick={logout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Stats Overview */}
      <LeadStats {...stats} isLoading={isLoading} />

      {/* Main Content Area */}
      <main className="flex flex-col gap-4">
        
        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-card)] dark:bg-[#ffffff05] border border-[var(--border-color)] text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 transition-shadow"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {['All', 'New', 'Contacted', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status 
                    ? 'bg-[var(--brand-primary)] text-white shadow-md' 
                    : 'bg-[var(--bg-card)] dark:bg-[#ffffff05] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table Component */}
        <LeadTable 
          leads={paginatedLeads} 
          isLoading={isLoading} 
          onStatusChange={handleStatusChange}
          onDeleteClick={confirmDelete}
        />

        {!isLoading && filteredLeads.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Lead"
      >
        <p className="text-[var(--text-muted)] mb-6">
          Are you sure you want to delete the lead from <strong className="text-[var(--text-main)]">{leadToDelete?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleDelete} 
            isLoading={isDeleting}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white"
          >
            Confirm Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
