import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, User, Mail, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';
import { createLeadSchema, type CreateLeadInput } from '../schemas/lead.schema';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

export const LeadForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema) as any,
    defaultValues: {
      name: '',
      email: '',
      budget: '' as any,
      message: '',
    }
  });

  const onSubmit = async (data: CreateLeadInput) => {
    try {
      setServerError(null);
      await api.post('/api/leads', data);
      setIsSuccess(true);
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || 'Something went wrong. Please try again later.'
      );
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[var(--bg-card)] dark:bg-[#ffffff05] backdrop-blur-xl border border-[var(--border-color)] shadow-[var(--glass-shadow)] text-center animate-in zoom-in-95 duration-500 transition-colors">
        <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Request Received!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Thank you for reaching out. Our team is reviewing your details and will be in touch shortly.
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            reset();
            setIsSuccess(false);
          }}
          className="w-full sm:w-auto"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] dark:bg-[#ffffff05] backdrop-blur-xl border border-[var(--border-color)] shadow-[var(--glass-shadow)] animate-in fade-in slide-in-from-bottom-10 duration-700 transition-colors">
      
      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 dark:text-red-200">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            icon={<User size={18} />}
            error={errors.name?.message}
            {...register('name')}
          />
          
          <Input
            label="Work Email"
            type="email"
            placeholder="jane@company.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <Select
          label="Project Budget"
          error={errors.budget?.message}
          options={[
            { label: 'Less than $1,000', value: '<$1k' },
            { label: '$1,000 - $5,000', value: '$1k-5k' },
            { label: '$5,000 - $10,000', value: '$5k-10k' },
            { label: '$10,000+', value: '$10k+' },
          ]}
          {...register('budget')}
        />

        <Textarea
          label="Project Details"
          placeholder="Tell us about your goals, timeline, and what you're looking to achieve..."
          error={errors.message?.message}
          {...register('message')}
        />

        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Request Consultation'}
        </Button>
      </form>
    </div>
  );
};
