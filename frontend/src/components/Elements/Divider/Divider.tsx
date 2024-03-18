import clsx from 'clsx';
import React from 'react';


const variants = {
  full: 'mx-0',
  middle: 'mx-3',
};

const sizes = {
    sm: '',
    md: 'border-2',
    lg: 'border-4',
    xl: 'border-8',
}


export type DividerProps = {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    className?: string;
};

export const Divider = (
    {
        variant = 'full', 
        size = 'md', 
        className
    }: DividerProps) => {
    return (
        <hr className={clsx(
            'border-secondary-light', 
            sizes[size],
            variants[variant],
            className
            )} />
    )
}