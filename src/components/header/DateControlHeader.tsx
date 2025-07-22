import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import RightArrowButton from '@/components/button/icon/RightArrowButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker.css';
import { ko } from 'date-fns/locale';
import DateInput from '@/components/header/DateInput';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { useDateControl } from '@/hooks/useDateControl';
import { useLocation } from 'react-router-dom';
import DefaultHeader from '@/components/header/DefaultHeader';

interface Props {
  headerDate: Date;
  setHeaderDate: (date: Date) => void;
}

const DateControlHeader = ({ headerDate, setHeaderDate }: Props) => {
  const { pathname } = useLocation();
  const { currentReportType } = useReportTypeStore();
  const { prevYearHandler, nextYearHandler, prevMonthHandler, nextMonthHandler } = useDateControl({
    headerDate,
    setHeaderDate,
  });

  const isMonthType = (currentReportType === '월별' && pathname !== '/month-week') || pathname === '/';

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={isMonthType ? prevMonthHandler : prevYearHandler} />}
      label={
        <DatePicker
          locale={ko}
          selected={headerDate}
          onChange={date => {
            if (date) setHeaderDate(date);
          }}
          showMonthYearPicker={isMonthType}
          showYearPicker={!isMonthType}
          dateFormat={isMonthType ? 'yyyy년 MM월' : 'yyyy년'}
          customInput={<DateInput />}
        />
      }
      rightButton={<RightArrowButton onClick={isMonthType ? nextMonthHandler : nextYearHandler} />}
    />
  );
};

export default DateControlHeader;
