
import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: 'idle' | 'loading' | 'success' | 'error';
  loadingText?: string;
  successText?: string;
  errorText?: string;
  className?: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  loadingText = 'Loading...',
  successText = 'Success',
  errorText = 'Error',
  className,
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full';
  
  switch (status) {
    case 'loading':
      return (
        <span className={cn(baseClasses, 'bg-amber-100 text-amber-700', className)}>
          <Loader2 size={12} className="animate-spin" />
          {loadingText}
        </span>
      );
    case 'success':
      return (
        <span className={cn(baseClasses, 'bg-green-100 text-green-700', className)}>
          <Check size={12} />
          {successText}
        </span>
      );
    case 'error':
      return (
        <span className={cn(baseClasses, 'bg-red-100 text-red-700', className)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9v3m0 3h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {errorText}
        </span>
      );
    default:
      return null;
  }
};

export { StatusBadge };
