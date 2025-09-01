import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { clsx } from 'clsx';
import SubActionButton from '@/components/button/SubActionButton';
import CheckIcon from '@/components/icon/CheckIcon';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface PrimaryInputProps {
  label: string;
  value?: string | number;
  maxLength?: number;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  handleVisibleClick?: () => void;
  isRequired?: boolean;
  isPending?: boolean;
  hasCount?: boolean;
  hasCheckIcon?: boolean;
  buttonLabel?: string;
  handleClick?: () => void;
  successMessage?: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  asNumberFormat?: boolean;
  numericFormatProps?: Partial<NumericFormatProps>;
  'data-testid'?: string;
}

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  (
    {
      label,
      value,
      maxLength,
      isPassword,
      isPasswordVisible,
      handleVisibleClick,
      isRequired,
      isPending,
      hasCount,
      hasCheckIcon,
      buttonLabel,
      successMessage,
      errorMessage,
      handleClick,
      readOnly,
      asNumberFormat,
      numericFormatProps,
      ...rest
    },
    ref,
  ) => {
    const message = successMessage || errorMessage;
    const baseInputClass = clsx(
      readOnly && 'bg-strokeGray',
      successMessage && 'border-oliveGreen!',
      errorMessage && 'border-sunsetRose!',
      hasCount && 'pr-25',
      'input-common',
    );

    const InputElement = asNumberFormat ? (
      <NumericFormat
        {...(rest as Omit<typeof rest, 'value' | 'defaultValue'>)}
        {...numericFormatProps}
        type="text"
        getInputRef={ref}
        className={baseInputClass}
        autoComplete="off"
      />
    ) : (
      <input
        ref={ref}
        readOnly={readOnly}
        maxLength={maxLength}
        className={baseInputClass}
        autoComplete="off"
        {...rest}
        onInput={e => {
          const target = e.target as HTMLInputElement;
          if (maxLength && target.value.length > maxLength) {
            target.value = target.value.slice(0, maxLength);
          }
        }}
      />
    );

    return (
      <label className={clsx(message ? 'items-start' : 'items-center', 'w-full flex justify-between')}>
        <div className="relative w-fit h-fit">
          <span>{label}</span>
          {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
        </div>
        <div className="w-3/5">
          <div className="w-full h-[3.2rem] flex gap-2 relative">
            <div className="flex grow gap-2 relative">
              {InputElement}
              {hasCheckIcon && (
                <span className="absolute top-1/2 -translate-y-1/2 right-3">
                  <CheckIcon color="#a1c377" />
                </span>
              )}
              {hasCount && (
                <span className="absolute top-1/2 -translate-y-1/2 right-3 text-md text-defaultGrey">
                  ({value?.toString()?.length ?? 0}/{maxLength})
                </span>
              )}
              {isPassword && (
                <button
                  type="button"
                  onClick={handleVisibleClick}
                  className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-500 cursor-pointer">
                  {isPasswordVisible ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                </button>
              )}
            </div>
            {buttonLabel && (
              <SubActionButton
                data-testid="verify-button"
                type="button"
                label={buttonLabel}
                isPending={isPending}
                onClick={handleClick}
              />
            )}
          </div>
          {typeof message === 'string' && (
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
