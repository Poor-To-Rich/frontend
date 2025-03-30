import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import RightArrowButton from '@/components/button/icon/RightArrowButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker.css';
import { ko } from 'date-fns/locale';
import DateInput from '@/components/header/DateInput';
import { useReportTypeStore } from '@/stores/useReportTypeStore';
import { useDateControl } from '@/hooks/useDateControl';
import { useDateStore } from '@/stores/useDateStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DateControlHeader = () => {
  const { pathname } = useLocation();
  const { currentReportType } = useReportTypeStore();
  const { currentDate, setCurrentDate, clearCurrentDate } = useDateStore();
  const { prevYearHandler, nextYearHandler, prevMonthHandler, nextMonthHandler } = useDateControl();

  const isMonthType = currentReportType === '월별' && pathname !== '/month-week';

  useEffect(() => {
    return () => clearCurrentDate();
  }, []);

  return (
    <header className="header-common">
      <span className="absolute left-0 h-full aspect-square cursor-pointer">
        <LeftArrowButton onClick={isMonthType ? prevMonthHandler : prevYearHandler} />
      </span>
      <DatePicker
        locale={ko}
        disabled={pathname !== '/chart'}
        selected={currentDate}
        onChange={date => {
          if (date) setCurrentDate(date);
        }}
        showMonthYearPicker={isMonthType}
        showYearPicker={!isMonthType}
        dateFormat={isMonthType ? 'yyyy년 MM월' : 'yyyy년'}
        customInput={<DateInput />}
      />
      <span className="absolute right-0 h-full aspect-square cursor-pointer">
        <RightArrowButton onClick={isMonthType ? nextMonthHandler : nextYearHandler} />
      </span>
    </header>
  );
};

export default DateControlHeader;
