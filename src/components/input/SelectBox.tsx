import { IncomeExpenseButtonType, SelectOptionsType } from '@/types/types';
import DropdownIcon from '@/components/icon/DropdownIcon';
import { forwardRef } from 'react';
import CategoryLinkButton from '@/components/button/icon/CategoryLinkButton';
import clsx from 'clsx';

interface SelectBoxProps {
  label: string;
  isRequired?: boolean;
  options: SelectOptionsType[];
  type?: IncomeExpenseButtonType;
  hasEditButton?: boolean;
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ label, isRequired, options, type, hasEditButton, ...rest }, ref) => {
    return (
      <div className="w-full flex justify-between items-center">
        <label className="relative w-fit h-fit">
          <span>{label}</span>
          {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
        </label>
        <div className="w-3/5 relative">
          <div className="w-full h-[3.2rem] flex gap-2">
            <select className="input-common appearance-none" {...rest} ref={ref}>
              {options.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <span
              className={clsx(hasEditButton ? 'right-[4rem]' : 'right-[0.75rem]', 'absolute top-1/2 -translate-y-1/2')}>
              <DropdownIcon />
            </span>
            {hasEditButton && type && <CategoryLinkButton type={type} />}
          </div>
        </div>
      </div>
    );
  },
);

export default SelectBox;
