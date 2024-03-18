import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';


type CheckBoxFieldProps = {
    label?: string;
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const CheckBoxField = (props: CheckBoxFieldProps) => {
  const { label, className, registration } = props;
  
  return (
    <div className='flex gap-1 items-center'>
        <input
            className={clsx('accent-primary-dark rounded w-4 h-4', className)}
            type='checkbox'
            {...registration}
        />
        <label className='text-sm font-light text-secondary-dark' htmlFor='remember_me'>{label}</label>
    </div>
  );
};