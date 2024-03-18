import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import { MdArrowForwardIos } from "react-icons/md"
import { Url } from 'next/dist/shared/lib/router/router';


const variants = {
  primary: 'text-lg font-semibold',
  secondary: 'text-md font-semibold',
};



export type DisplayButtonProps = {
    variant?: keyof typeof variants;
    className?: string;
    info?: string;
    primary?: string;
    secondary?: string;
    to: Url;
};

export const DisplayButton =(
  (
    {
        variant = 'primary',
        className,
        info,
        primary,
        secondary,
        to,
    } : DisplayButtonProps
  ) => {
    return (
          <Link href={to} className={clsx("hover:bg-gray-light relative overflow-scroll w-full flex flex-row items-center justify-between px-4 py-2", className)}>
              <div>
                  {info && <p className={"text-xs font-light text-secondary-dark"}>{info}</p>}
                  <h3 className={clsx("text-secondary-dark", variants[variant])}>{primary}</h3>
                  {secondary && <h4 className={"text-sm font-light text-secondary-dark"}>{secondary}</h4>}
              </div>
              <MdArrowForwardIos className={"h-6 w-6"} />
          </Link>
    );
  }
);