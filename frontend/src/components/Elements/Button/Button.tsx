import clsx from 'clsx';
import * as React from 'react';

import { Spinner } from '@/components/Elements/Spinner';

const variants = {
  primary: 'bg-secondary-dark text-gray-light',
  secondary: 'bg-secondary-light text-gray-dark',
  dark: 'bg-primary-dark text-white',
  inverse: 'bg-white text-blue-600',
  danger: 'bg-red-600 text-white',
};


const sizes = {
  xs: 'py-0.5 px-1 text-xs',
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
  auto: 'py-0.5 px-1 text-xs md:py-2 md:px-6 md:text-md',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex justify-center items-center disabled:opacity-70 rounded-lg shadow-sm font-medium focus:outline-none hover:opacity-95 active:opacity-80',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';