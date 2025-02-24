import { SelectOptionsType } from '@/types/types';
import DropdownIcon from '@/components/icon/DropdownIcon';
import { forwardRef } from 'react';

interface Props {
  label: string;
  isRequired?: boolean;
  options: SelectOptionsType[];
  value?: string;
  onChange?: (value: string) => void;
}

const SelectBox = forwardRef<HTMLSelectElement, Props>(({ label, isRequired, options, value, onChange }, ref) => {
  return (
    <div className="w-full flex justify-between items-center">
      <label className="relative w-fit h-fit">
        <span>{label}</span>
        {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
      </label>
      <div className="w-3/5 relative">
        <div className="w-full h-[3.2rem] flex gap-2">
          <select
            className="input-common appearance-none"
            value={value}
            onChange={e => onChange?.(e.target.value)}
            ref={ref}>
            {options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <span className="absolute right-[0.75rem] top-1/2 -translate-y-1/2">
            <DropdownIcon />
          </span>
        </div>
      </div>
    </div>
  );
});

export default SelectBox;
