import clsx from 'clsx';
import React, { MouseEventHandler } from 'react';
import Link from 'next/link';
import { MdArrowForwardIos } from "react-icons/md"
import { Url } from 'next/dist/shared/lib/router/router';


const variants = {
  primary: 'text-lg font-semibold',
  secondary: 'text-base font-semibold py-4',
};

type BaseDisplayButtonProps = {
  variant?: keyof typeof variants;
  className?: string;
  info?: string;
  primary?: string;
  secondary?: string;
  textColor?: string;
};
const BaseDisplayButton = (
  (
    {
        variant = 'primary',
        className,
        info,
        primary,
        secondary,
        textColor = 'text-secondary-dark',
    } : BaseDisplayButtonProps
  ) => {
    return (
          <div className={clsx("hover:bg-gray-light relative overflow-scroll w-full flex flex-row items-center justify-between px-4 py-2", className, textColor)}>
              <div>
                  {info && <p className={"text-xs font-light "}>{info}</p>}
                  <h3 className={clsx(variants[variant])}>{primary}</h3>
                  {secondary && <h4 className={"text-sm font-light"}>{secondary}</h4>}
              </div>
              <MdArrowForwardIos className={"h-6 w-6 text-secondary-dark"} />
          </div>
    );
  }
  );


export type DisplayButtonLinkProps = BaseDisplayButtonProps &  {
    to: Url;
};

export const DisplayButtonLink =(
  (
    {
        to,
        ...props
    } : DisplayButtonLinkProps
  ) => {
    return (
          <Link href={to} className="w-full">
              <BaseDisplayButton {...props} />
          </Link>
    );
  }
);


export type DisplayButtonProps = BaseDisplayButtonProps & {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const DisplayButton =(
(
  {
      onClick,
      ...props
  } : DisplayButtonProps
) => {
  return (
        <button onClick={onClick} className="w-full">
            <BaseDisplayButton {...props} />
        </button>
  );
}
);