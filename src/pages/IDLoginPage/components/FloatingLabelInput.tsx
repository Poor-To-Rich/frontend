import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface Props {
  label: '아이디' | '비밀번호';
  errorMessage?: string;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, Props & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
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
        <label
          className={clsx(
            errorMessage ? 'text-sunsetRose' : 'text-oliveGreen',
            'absolute top-[-1.2rem] left-3  bg-vanillaCream px-3.5 peer-focus:font-bold',
          )}>
          {label}
        </label>
        <span className="text-sm text-sunsetRose">{errorMessage}</span>
      </div>
    );
  },
);

export default FloatingLabelInput;
