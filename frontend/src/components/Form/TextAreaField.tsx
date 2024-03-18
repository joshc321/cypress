'use client';

import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';
import React from 'react';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  maxRows?: number;
  placeholder?: string;
};

export const TextAreaField = (props: TextAreaFieldProps) => {


  const { label, className, registration, maxRows = 5, error, placeholder } = props;
  const {ref, ...rest} = registration;

  const [rows, setRows] = React.useState(1);
  // const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);


  React.useEffect(() => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const computeRows = () => {
    const text = textarea.value;
      setRows( Math.min(Math.max(typeof text === 'string' ? text.split('\n').length : 1, 1), maxRows));
    };

    computeRows();

    const handleInput = () => {
      computeRows();
    };

    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, [maxRows]);




  
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={clsx(
          'w-full focus:outline-secondary-dark rounded-lg border-solid border border-secondary border-box p-3',
          className
        )}
        {...rest}
        rows={rows}
        ref={(e) => {
          if (ref) {
            ref(e);
          }
          textAreaRef.current = e;
        }}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
};