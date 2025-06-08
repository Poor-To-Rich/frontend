import DropdownIcon from '@/components/icon/DropdownIcon';
import { ChangeEvent, forwardRef } from 'react';
import CategoryLinkButton from '@/components/button/icon/CategoryLinkButton';
import { clsx } from 'clsx';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { SelectOptionsType } from '@/types/fieldType';
import { ReportType } from '@/types/reportTypes';

interface SelectBoxProps {
  label?: string;
  isRequired?: boolean;
  options: SelectOptionsType[];
  value?: ReportType;
  type?: IncomeExpenseType;
  hasEditButton?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ label, isRequired, options, value, type, hasEditButton, onChange, ...rest }, ref) => {
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
                className="input-common appearance-none cursor-pointer"
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
                  'absolute top-1/2 -translate-y-1/2 pointer-events-none',
                )}>
                <DropdownIcon />
              </span>
              {hasEditButton && type && <CategoryLinkButton type={type} />}
            </div>
          </div>
        </label>
      </div>
    );
  },
);

export default SelectBox;
