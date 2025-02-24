import { SelectOptionsType } from '@/types/types';
import DropdownIcon from '@/components/icon/DropdownIcon';

interface Props {
  isRequired?: boolean;
  options: SelectOptionsType[];
}

const SelectBox = ({ isRequired, options }: Props) => {
  return (
    <div className="w-full flex justify-between items-center">
      <label className="relative w-fit h-fit">
        <span>성별</span>
        {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
      </label>
      <div className="w-3/5 relative">
        <div className="w-full h-[3.2rem] flex gap-2">
          <select className="input-common appearance-none">
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
};

export default SelectBox;
