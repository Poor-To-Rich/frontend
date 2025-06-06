import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import useGetDailyDetails from '@/hooks/apis/transaction/useGetDailyDetails';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { format } from 'date-fns';
import DailySummeryItem from '@/pages/MainPage/components/daily/DailySummeryItem';

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
        (isEmpty || isPending) && 'justify-center items-center',
        'flex flex-col w-full min-h-[20rem] max-h-[25rem] items-center gap-5 border-t py-5 pb-7 border-strokeGray overflow-y-auto custom-scrollbar',
      )}>
      {isPending ? (
        <span>로딩중...</span>
      ) : isEmpty || !dailyDetails ? (
        <span className="text-defaultGrey">내역이 없습니다.</span>
      ) : (
        <>
          <div className="w-full flex flex-col items-center gap-2.5">
            {dailyDetails.dailyDetails.map(({ id, color, categoryName, title, isIteration, type, cost }) => (
              <TransactionDetailItem
                key={id}
                id={id}
                color={color}
                categoryName={categoryName}
                title={title}
                isIteration={isIteration}
                type={type}
                cost={cost}
              />
            ))}
          </div>
          <div className="w-[95%] flex flex-col gap-1.5">
            <DailySummeryItem label="수입" amount={dailyDetails.totalIncome.toLocaleString()} />
            <DailySummeryItem label="지출" amount={dailyDetails.totalExpense.toLocaleString()} />
            <DailySummeryItem label="합계" amount={dailyDetails.totalAmount.toLocaleString()} />
          </div>
        </>
      )}
    </div>
  );
};

export default DailyTransactionList;
