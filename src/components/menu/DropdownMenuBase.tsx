import { DropDownMenuOption } from '@/types/propsTypes';
import clsx from 'clsx';

interface Props {
  options: DropDownMenuOption[];
}

const DropdownMenuBase = ({ options }: Props) => {
  return (
    <div className="w-[15rem] rounded-xl border border-strokeGray bg-white shadow">
      {options.map(option => (
        <button
          key={option.label}
          onClick={option.onClick}
          className={clsx('block w-full text-left p-4 text-md font-medium rounded-md cursor-pointer', {
            'text-sunsetRose': option.danger,
            'text-black': !option.danger,
          })}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenuBase;
