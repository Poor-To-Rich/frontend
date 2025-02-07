import clsx from 'clsx';
import { useState } from 'react';

const IncomeExpenseButton = () => {
  const [type, setType] = useState<string>('지출');

  const options = [
    { label: '지출', color: 'bg-pinkRed font-bold' },
    { label: '수입', color: 'bg-lightBlue font-bold' },
  ];

  return (
    <div className="w-full flex justify-center gap-6">
      {options.map(({ label, color }) => (
        <button
          key={label}
          value={label}
          className={clsx(
            'w-[45%] h-[3rem] rounded-lg ',
            label === '지출' && 'text-sunsetRose',
            label === '수입' && 'text-oceanBlue',
            type === label ? color : 'border border-strokeGray',
          )}
          onClick={() => setType(label)}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default IncomeExpenseButton;
