import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface Props {
  label: '아이디' | '비밀번호';
  errorMessage?: string;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  handleVisibleClick?: () => void;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, Props & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, errorMessage, isPassword, isPasswordVisible, handleVisibleClick, ...rest }, ref) => {
    return (
      <div>
        <div className="relative">
          <input
            {...rest}
            ref={ref}
            className={clsx(
              errorMessage ? 'border-sunsetRose' : 'border-oliveGreen',
              'peer w-full h-[4.5rem] px-7 rounded-md border  focus:outline-none focus:border-2',
            )}
            autoComplete="off"
          />
          {isPassword && (
            <button
              type="button"
              onClick={handleVisibleClick}
              className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-500 cursor-pointer">
              {isPasswordVisible ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
            </button>
          )}
          <label
            className={clsx(
              errorMessage ? 'text-sunsetRose' : 'text-oliveGreen',
              'absolute top-[-1.2rem] left-3  bg-vanillaCream px-3.5 peer-focus:font-bold',
            )}>
            {label}
          </label>
        </div>
        <span className="text-sm text-sunsetRose">{errorMessage}</span>
      </div>
    );
  },
);

export default FloatingLabelInput;
