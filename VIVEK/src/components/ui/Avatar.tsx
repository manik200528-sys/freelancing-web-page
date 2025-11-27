import React from 'react';
import { cn } from '../../utils/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  name,
  size = 'md', 
  className,
  status
}) => {
  const sizeStyles: Record<AvatarSize, string> = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };
  
  const statusClasses: Record<string, string> = {
    online: 'bg-success-500',
    offline: 'bg-gray-400',
    away: 'bg-warning-500',
    busy: 'bg-error-500',
  };
  
  // Get initials from name
  const getInitials = () => {
    if (!name) return '';
    
    const nameArray = name.split(' ');
    if (nameArray.length === 1) return nameArray[0].charAt(0).toUpperCase();
    
    return (
      nameArray[0].charAt(0).toUpperCase() + 
      nameArray[nameArray.length - 1].charAt(0).toUpperCase()
    );
  };
  
  const statusSize = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
  };
  
  return (
    <div className="relative">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            'rounded-full object-cover',
            sizeStyles[size],
            className
          )}
        />
      ) : (
        <div 
          className={cn(
            'flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium',
            sizeStyles[size],
            className
          )}
        >
          {getInitials()}
        </div>
      )}
      
      {status && (
        <span 
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            statusSize[size],
            statusClasses[status]
          )}
        ></span>
      )}
    </div>
  );
};