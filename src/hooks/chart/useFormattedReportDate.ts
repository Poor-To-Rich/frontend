import { format } from 'date-fns';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';

const useFormattedReportDate = () => {
  const { chartHeaderDate } = useHeaderDateStore();
  const { currentReportType } = useReportTypeStore();

  const formattedDate =
    currentReportType === '연별' ? format(chartHeaderDate, 'yyyy') : format(chartHeaderDate, 'yyyy-MM');

  return formattedDate;
};

export default useFormattedReportDate;
