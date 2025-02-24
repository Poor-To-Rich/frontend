import { VerifyButtonType } from '@/types/types';
import { forwardRef } from 'react';
import VerifyButton from '@/components/button/VerifyButton';
import clsx from 'clsx';

interface Props {
  label: string;
  isRequired?: boolean;
  buttonLabel?: VerifyButtonType;
  handleClick?: () => void;
  errorMessage?: string;
}

const PrimaryInput = forwardRef<HTMLInputElement, Props & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, isRequired, buttonLabel, errorMessage, handleClick, ...rest }, ref) => {
    return (
      <div className={clsx(errorMessage ? 'items-start' : 'items-center', 'w-full flex justify-between ')}>
        <label className="relative w-fit h-fit">
          <span>{label}</span>
          {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
        </label>
        <div className="w-3/5">
          <div className="w-full h-[3.2rem] flex gap-2">
            <input ref={ref} {...rest} className="input-common" />
            {buttonLabel && <VerifyButton label={buttonLabel} onClick={handleClick} />}
          </div>
          {errorMessage && <span className="w-fit h-fit text-sm">{errorMessage}</span>}
        </div>
      </div>
    );
  },
);

export default PrimaryInput;
