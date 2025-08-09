import { type HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      hoverEffect = false,
      padding = 'md',
      rounded = 'lg',
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const roundedClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'bg-white overflow-hidden',
          'border border-gray-200',
          hoverEffect && 'transition-shadow duration-200 hover:shadow-md',
          paddingClasses[padding],
          roundedClasses[rounded],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
export type { CardProps };
