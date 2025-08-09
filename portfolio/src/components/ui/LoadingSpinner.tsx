import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray' | 'black';
  className?: string;
}

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    xs: 'h-4 w-4 border-2',
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-10 w-10 border-2',
    xl: 'h-12 w-12 border-2',
  };

  const colorClasses = {
    primary: 'border-indigo-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
    black: 'border-gray-900 border-t-transparent',
  };

  return (
    <div
      className={twMerge(
        'inline-block animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { LoadingSpinner };
export type { LoadingSpinnerProps };
