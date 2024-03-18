import clsx from 'clsx';
import React from 'react';

import { Spinner } from '@/components/Elements/Spinner';

const variants = {
  primary: 'text-primary-dark hover:bg-secondary-light',
  inverse: 'text-white hover:opacity-90',
  danger: 'text-red hover:opacity-90',
};


const sizes = {
  sm: 'p-0 text-sm',
  md: 'p-1 text-md',
  lg: 'p-2 text-lg',
};



export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <button
          ref={ref}
          type={type}
          className={clsx(
            'inline-flex justify-center items-center disabled:opacity-70 rounded-full border-none active:opacity-80',
            variants[variant],
            sizes[size],
            className
          )}
          {...props}
        >
          {isLoading && <Spinner size="sm" className="text-current" />}
          <span>{props.children}</span>
        </button>
      </div>
    );
    
  }
);

IconButton.displayName = 'IconButton';