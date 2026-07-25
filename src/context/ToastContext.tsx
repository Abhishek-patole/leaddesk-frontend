import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../components/ui/Input';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, message: string) => addToast(type, message), [addToast]);
  const success = useCallback((message: string) => addToast('success', message), [addToast]);
  const error = useCallback((message: string) => addToast('error', message), [addToast]);
  const info = useCallback((message: string) => addToast('info', message), [addToast]);
  const warning = useCallback((message: string) => addToast('warning', message), [addToast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info, warning }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-[var(--glass-shadow)] border backdrop-blur-xl animate-in slide-in-from-top-5 fade-in duration-300",
              t.type === 'success' && "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 dark:bg-emerald-950/90 dark:border-emerald-500/30 dark:text-emerald-200",
              t.type === 'error' && "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/20 dark:bg-red-950/90 dark:border-red-500/30 dark:text-red-200",
              t.type === 'info' && "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20 dark:bg-blue-950/90 dark:border-blue-500/30 dark:text-blue-200",
              t.type === 'warning' && "bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/20 dark:bg-amber-950/90 dark:border-amber-500/30 dark:text-amber-200"
            )}
          >
            <div className="flex items-center gap-3">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
              {t.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
              {t.type === 'info' && <Info className="w-5 h-5 shrink-0" />}
              {t.type === 'warning' && <AlertTriangle className="w-5 h-5 shrink-0" />}
              <p className="text-sm font-medium">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
