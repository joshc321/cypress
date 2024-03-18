import clsx from 'clsx';
import * as React from 'react';

const variants = {
  primary: 'text-white bg-primary hover:bg-primary-dark',
  inverse: 'bg-white text-blue-600',
  danger: 'bg-red-600 text-white',
};


const sizes = {
  sm: 'w-12 h-12',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
};

export type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      children = null,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex items-center justify-center rounded-full focus:outline-none active:opacity-80',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {!children && 
            <svg className="w-5 h-5 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
        }
        {children && children}
        <span className="sr-only">Open actions menu</span>
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';