import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { loginSchema, type LoginInput } from '../../schemas/auth.schema';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // If already authenticated and not loading initial state, redirect
  if (!isAuthLoading && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      success('Welcome back, Admin!');
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      error(err.response?.data?.message || 'Invalid email or password');
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-primary)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Home
      </Link>

      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-card)] dark:bg-[#ffffff05] backdrop-blur-xl border border-[var(--border-color)] shadow-[var(--glass-shadow)] animate-in fade-in zoom-in-95 duration-500">
        
        <div className="mb-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[var(--brand-primary)]/20">
            L
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Admin Login</h1>
          <p className="text-[var(--text-muted)] mt-2">Sign in to manage your leads</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@example.com"
            icon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[34px] p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>

      </div>
    </div>
  );
};
