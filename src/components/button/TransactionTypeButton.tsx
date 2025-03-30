import clsx from 'clsx';
import { useState } from 'react';

const TransactionTypeButton = () => {
  const [type, setType] = useState<string>('지출');

  const options = [
    { label: '지출', color: 'bg-pinkRed' },
    { label: '수입', color: 'bg-lightBlue' },
  ];

  return (
    <div className="flex w-[11rem] h-[3rem]">
      {options.map(({ label, color }) => (
        <button
          key={label}
          value={label}
          onClick={() => setType(label)}
          className={clsx(
            'w-1/2 border border-strokeGray text-md cursor-pointer',
            label === '지출' ? 'text-sunsetRose rounded-l-lg' : 'text-oceanBlue rounded-r-lg',
            label === type && color,
          )}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default TransactionTypeButton;
