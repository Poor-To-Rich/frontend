import { DropDownMenuOption } from '@/types/propsTypes';
import clsx from 'clsx';

interface Props {
  options: DropDownMenuOption[];
}

const DropdownMenuBase = ({ options }: Props) => {
  return (
    <div className="w-[15rem] rounded-xl border border-strokeGray bg-white shadow opacity-75">
      {options.map((option, i) => (
        <button
          key={i}
          onClick={option.onClick}
          className={clsx('block w-full text-left p-4 text-md rounded-md cursor-pointer', {
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
