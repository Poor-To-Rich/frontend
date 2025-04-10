import { ErrorMessageType, VerifyButtonType } from '@/types/types';
import { forwardRef } from 'react';
import VerifyButton from '@/components/button/VerifyButton';
import clsx from 'clsx';

interface PrimaryInputProps {
  label: string;
  isRequired?: boolean;
  buttonLabel?: VerifyButtonType;
  handleClick?: () => void;
  message?: ErrorMessageType;
}

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, isRequired, buttonLabel, message, handleClick, ...rest }, ref) => {
    return (
      <div className={clsx(message ? 'items-start' : 'items-center', 'w-full flex justify-between ')}>
        <label className="relative w-fit h-fit">
          <span>{label}</span>
          {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
        </label>
        <div className="w-3/5">
          <div className="w-full h-[3.2rem] flex gap-2">
            <input
              ref={ref}
              {...rest}
              className={clsx(message && 'border-sunsetRose!', 'input-common')}
              autoComplete="off"
            />
            {buttonLabel && <VerifyButton label={buttonLabel} onClick={handleClick} />}
          </div>
          {typeof message === 'string' && <span className="w-fit h-fit text-sm text-sunsetRose">{message}</span>}
        </div>
      </div>
    );
  },
);

export default PrimaryInput;
