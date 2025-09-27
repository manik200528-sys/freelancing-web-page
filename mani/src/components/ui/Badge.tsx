import React from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className,
  onClick
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    outline: 'bg-transparent text-gray-700 border border-gray-300',
  };
  
  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        onClick && 'cursor-pointer',
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
};