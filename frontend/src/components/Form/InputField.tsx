import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

export type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'number' | 'datetime-local';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  placeholder?: string;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error, endAdornment, placeholder, startAdornment } = props;

  return (
    <FieldWrapper label={label} error={error}>
        <div className='relative w-full'>
            <input
            type={type}
            placeholder={placeholder}
            className={clsx(
                'appearance-none w-full p-3 border border-solid border-secondary rounded-lg border-box focus:border-none focus:outline-secondary-dark',
                className,
                endAdornment && 'pr-11',
                startAdornment && 'pl-11',
            )}
            {...registration}
            />
            {
                startAdornment && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center z-10">
                    {startAdornment}
                </div>
                )
            }
            {
            endAdornment && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center z-10">
                {endAdornment}
            </div>
            )
            }
      </div>
    </FieldWrapper>
  );
};