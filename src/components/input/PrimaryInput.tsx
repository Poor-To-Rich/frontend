import { ErrorMessageType, VerifyButtonType } from '@/types/types';
import { forwardRef } from 'react';
import VerifyButton from '@/components/button/VerifyButton';
import clsx from 'clsx';
import CheckIcon from '@/components/icon/CheckIcon';

interface PrimaryInputProps {
  label: string;
  isRequired?: boolean;
  buttonLabel?: VerifyButtonType;
  handleClick?: () => void;
  successMessage?: string;
  errorMessage?: ErrorMessageType;
}

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, isRequired, buttonLabel, successMessage, errorMessage, handleClick, ...rest }, ref) => {
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
            <input
              ref={ref}
              {...rest}
              className={clsx(
                successMessage && 'border-oliveGreen!',
                errorMessage && 'border-sunsetRose!',
                'input-common',
              )}
              autoComplete="off"
            />
            {successMessage && (
              <span className="absolute top-1/2 -translate-y-1/2 right-32">
                <CheckIcon color="#a1c377" />
              </span>
            )}
            {buttonLabel && <VerifyButton type="button" label={buttonLabel} onClick={handleClick} />}
          </div>
          {typeof errorMessage === 'string' && (
            <span className="w-fit h-fit text-sm text-sunsetRose">{errorMessage}</span>
          )}
          {successMessage && <span className="w-fit h-fit text-sm text-oliveGreen">{successMessage}</span>}
        </div>
      </label>
    );
  },
);

export default PrimaryInput;
