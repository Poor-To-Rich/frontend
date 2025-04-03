import SortingButton from '@/components/button/icon/SortingButton';
import { useState } from 'react';
import { formatNumber } from '@/utils/number';
import clsx from 'clsx';

interface Props {
  transactionType: string;
}

const CategoryLogList = ({ transactionType }: Props) => {
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const { countOf, categoryLogs } = {
    countOf: 7,
    categoryLogs: [
      {
        date: '05.01',
        logs: [
          { id: 2, amount: 2002161 },
          { id: 3, amount: 45000 },
          { id: 7, amount: 243000 },
        ],
      },
      {
        date: '05.02',
        logs: [
          { id: 8, amount: 21000 },
          { id: 10, amount: 4000 },
          { id: 13, amount: 73000 },
        ],
      },
      {
        date: '07.02',
        logs: [{ id: 20, amount: 21000 }],
      },
    ],
  };
  const [LogData, setLogData] = useState(categoryLogs);
  const isEmpty = LogData.length === 0;

  const handleClick = () => {
    setIsDescending(prev => !prev);
    setLogData([...LogData].reverse());
  };

  return (
    <div className="w-full flex flex-col flex-grow mt-5">
      <div className="flex justify-between px-6 py-1.5 items-center w-full h-[3.5rem] border-b border-strokeGray">
        <span>총 {countOf}건</span>
        <SortingButton isDescending={isDescending} onClick={handleClick} />
      </div>
      <div className={`w-full ${isEmpty && 'flex grow items-center justify-center'}`}>
        {isEmpty ? (
          <span className="text-defaultGrey">내역이 없습니다</span>
        ) : (
          LogData.map(({ date, logs }) => (
            <div key={date} className="w-full flex justify-between border-b border-strokeGray">
              <div className=" w-full flex flex-col flex-grow">
                {logs.map(({ id, amount }, index) => (
                  <div
                    key={id}
                    className={clsx(
                      index === 0 ? 'justify-between' : 'justify-end',
                      transactionType === '지출' && 'text-sunsetRose',
                      transactionType === '수입' && 'text-oceanBlue',
                      `flex items-center px-8 gap-8  h-[4.8rem] cursor-pointer hover:bg-strokeGray active:bg-strokeGray`,
                    )}>
                    {index === 0 && <span className="text-[#555555]">{date}</span>}
                    <span className="text-lg truncate">{formatNumber(amount)}원</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryLogList;
