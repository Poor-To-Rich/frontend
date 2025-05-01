import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import useGetDailyDetails from '@/hooks/apis/transaction/useGetDailyDetails';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { formatNumber } from '@/utils/number';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { format } from 'date-fns';

const DailyTransactionList = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const { calenderDate } = useCalenderDateStore();
  const { data: dailyDetails, isPending } = useGetDailyDetails(format(calenderDate, 'yyyy-MM-dd'));

  useEffect(() => {
    if (dailyDetails && dailyDetails.dailyDetails.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [dailyDetails]);

  return (
    <div
      className={clsx(
        isEmpty && 'justify-center',
        'flex flex-col w-full min-h-[20rem] max-h-[25rem] items-center gap-5 border-t py-5 pb-7 border-strokeGray overflow-y-auto custom-scrollbar',
      )}>
      {isPending ? (
        <div>로딩중...</div>
      ) : isEmpty || !dailyDetails ? (
        <span className="text-defaultGrey">내역이 없습니다.</span>
      ) : (
        <>
          <div className="w-full flex flex-col items-center gap-2.5 mb-5">
            {dailyDetails.dailyDetails.map(({ id, color, category, title, isIteration, type, cost }) => (
              <TransactionDetailItem
                key={id}
                id={id}
                color={color}
                category={category}
                title={title}
                isIteration={isIteration}
                type={type}
                cost={cost}
              />
            ))}
          </div>
          <div className="w-[95%]">
            <span className="text-[#4c4c4c] text-lg">합계 : </span>
            <span className="text-defaultGrey ">{formatNumber(dailyDetails.totalAmount)}원</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DailyTransactionList;
