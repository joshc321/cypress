import clsx from 'clsx';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration, placeholder } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        name="location"
        className={clsx(
          'block w-full text-base focus:outline-secondary-dark rounded-lg border-solid border border-secondary border-box p-3 h-full',
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};