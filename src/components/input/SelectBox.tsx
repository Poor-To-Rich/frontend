import DropdownIcon from '@/components/icon/DropdownIcon';
import { ChangeEvent, forwardRef } from 'react';
import CategoryLinkButton from '@/components/button/icon/CategoryLinkButton';
import { clsx } from 'clsx';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { SelectOptionsType } from '@/types/fieldType';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface SelectBoxProps {
  label?: string;
  isRequired?: boolean;
  options: SelectOptionsType[];
  value?: string | number;
  type?: IncomeExpenseType;
  hasEditButton?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  'data-testid'?: string;
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ label, isRequired, options, value, type, hasEditButton, onChange, errorMessage, ...rest }, ref) => {
    return (
      <div>
        <label className={`w-full flex ${label && 'justify-between'} items-center`}>
          {label && (
            <div className="relative w-fit h-fit">
              <span>{label}</span>
              {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
            </div>
          )}

          <div className="w-3/5 relative">
            <div className="w-full h-[3.2rem] flex gap-2 cursor-pointer">
              <select
                className={clsx(errorMessage && 'border-sunsetRose!', 'input-common appearance-none cursor-pointer')}
                {...rest}
                value={value}
                ref={ref}
                onChange={onChange}>
                {options.map(({ label, value, visibility = true }) => (
                  <option key={value} value={value} hidden={!visibility}>
                    {label}
                  </option>
                ))}
              </select>
              <span
                className={clsx(
                  hasEditButton ? 'right-[4rem]' : 'right-[0.75rem]',
                  'absolute pointer-events-none',
                  errorMessage ? 'top-1/4 -translate-y-1/4' : 'top-1/2 -translate-y-1/2 ',
                )}>
                <DropdownIcon />
              </span>
              {hasEditButton && type && <CategoryLinkButton type={type} />}
            </div>
            {typeof errorMessage === 'string' && errorMessage && (
              <p
                data-testid={rest['data-testid'] ? `${rest['data-testid']}-helper-text` : 'helper-text'}
                className={clsx(errorMessage && 'text-sunsetRose', 'w-fit h-fit text-sm mt-1.5 whitespace-pre-line')}>
                {errorMessage}
              </p>
            )}
          </div>
        </label>
      </div>
    );
  },
);

export default SelectBox;
