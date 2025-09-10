import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
  isRequired?: boolean;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ label, value, onChange, maxLength, isRequired, errorMessage, ...rest }, ref) => {
    const length = (value ?? '').length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value.slice(0, maxLength);
      onChange({
        ...e,
        target: { ...e.target, value: newValue },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    };

    return (
      <div className="flex flex-col gap-2.5">
        <div className="relative w-fit h-fit">
          <label>{label}</label>
          {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
        </div>
        <textarea
          className={clsx(
            errorMessage && 'border-sunsetRose!',
            'input-common p-7 aspect-[4/1] resize-none whitespace-pre-line',
          )}
          ref={ref}
          {...rest}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
        />
        <div className="w-full flex justify-between">
          {typeof errorMessage === 'string' && errorMessage && (
            <p className={clsx(errorMessage && 'text-sunsetRose', 'w-fit h-fit text-sm mt-1.5')}>{errorMessage}</p>
          )}
          <span className="flex-grow text-end text-defaultGrey text-md">
            {length}/{maxLength}
          </span>
        </div>
      </div>
    );
  },
);

export default TextArea;
