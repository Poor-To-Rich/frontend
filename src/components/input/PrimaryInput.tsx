import { forwardRef } from 'react';
import VerifyButton from '@/components/button/VerifyButton';
import { clsx } from 'clsx';
import CheckIcon from '@/components/icon/CheckIcon';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { VerifyButtonType } from '@/types/fieldType';

interface PrimaryInputProps {
  label: string;
  isRequired?: boolean;
  hasCheckIcon?: boolean;
  buttonLabel?: VerifyButtonType;
  handleClick?: () => void;
  successMessage?: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  'data-testid'?: string;
}

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  (
    { label, isRequired, hasCheckIcon, buttonLabel, successMessage, errorMessage, handleClick, readOnly, ...rest },
    ref,
  ) => {
    const message = successMessage || errorMessage;

    return (
      <label
        className={clsx(
          errorMessage || successMessage ? 'items-start' : 'items-center',
          'w-full flex justify-between ',
        )}>
        <div className="relative w-fit h-fit">
          <span>{label}</span>
          {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
        </div>
        <div className="w-3/5">
          <div className="w-full h-[3.2rem] flex gap-2 relative">
            <div className="flex grow gap-2 relative">
              <input
                ref={ref}
                readOnly={readOnly}
                {...rest}
                className={clsx(
                  readOnly && 'bg-strokeGray',
                  successMessage && 'border-oliveGreen!',
                  errorMessage && 'border-sunsetRose!',
                  'input-common',
                )}
                autoComplete="off"
              />
              {hasCheckIcon && (
                <span className="absolute top-1/2 -translate-y-1/2 right-3">
                  <CheckIcon color="#a1c377" />
                </span>
              )}
            </div>
            {buttonLabel && (
              <VerifyButton data-testid="verify-button" type="button" label={buttonLabel} onClick={handleClick} />
            )}
          </div>
          {typeof message === 'string' && message && (
            <p
              data-testid={rest['data-testid'] ? `${rest['data-testid']}-helper-text` : 'helper-text'}
              className={clsx(
                errorMessage && 'text-sunsetRose',
                successMessage && 'text-oliveGreen',
                'w-fit h-fit text-sm mt-1.5 whitespace-pre-line',
              )}>
              {message}
            </p>
          )}
        </div>
      </label>
    );
  },
);

export default PrimaryInput;
