import { type HTMLAttributes, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'indigo' | 'transparent';
  fullWidth?: boolean;
}

const Section = ({
  children,
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  containerClassName = '',
  padding = 'md',
  background = 'white',
  fullWidth = false,
  ...props
}: SectionProps) => {
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24',
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    indigo: 'bg-indigo-50',
    transparent: 'bg-transparent',
  };

  const containerClasses = twMerge(
    fullWidth ? 'max-w-full' : 'max-w-7xl',
    'mx-auto px-4 sm:px-6 lg:px-8',
    containerClassName
  );

  return (
    <section
      className={twMerge(
        'w-full',
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      <div className={containerClasses}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2
                className={twMerge(
                  'text-3xl font-bold text-gray-900 sm:text-4xl',
                  titleClassName
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={twMerge(
                  'mt-4 text-lg text-gray-600 max-w-3xl mx-auto',
                  subtitleClassName
                )}
              >
                {subtitle}
              </p>
            )}
            <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export { Section };
export type { SectionProps };
