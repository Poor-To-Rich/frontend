import SelectBox from '@/components/input/SelectBox';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { ReportType } from '@/types/reportTypes';
import { useEffect } from 'react';

const ReportTypeSelection = () => {
  const { currentReportType, setCurrentReportType, clearReportType } = useReportTypeStore();
  const options = [
    { label: '월별', value: '월별' },
    { label: '연별', value: '연별' },
  ];

  useEffect(() => {
    return () => clearReportType();
  }, []);

  return (
    <div className="w-[10rem]">
      <SelectBox
        options={options}
        value={currentReportType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentReportType(e.target.value as ReportType)}
      />
    </div>
  );
};

export default ReportTypeSelection;
