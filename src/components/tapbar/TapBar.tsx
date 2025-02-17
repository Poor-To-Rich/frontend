import CalenderIcon from '@/components/icon/CalenderIcon';
import MonthWeekIcon from '@/components/icon/MonthWeekIcon';
import ChartIcon from '@/components/icon/ChartIcon';
import TalkIcon from '@/components/icon/TalkIcon';
import SettingIcon from '@/components/icon/SettingIcon';
import { TapBarType } from '@/types/types';
import { useState } from 'react';
import TapItem from '@/components/tapbar/TapItem';

interface Props {
  page: TapBarType;
}

const TapBar = ({ page }: Props) => {
  const [currentTap, setCurrentTap] = useState<TapBarType>(page);
  const handleTapClick = (value: TapBarType) => {
    setCurrentTap(value);
  };

  return (
    <div className="w-full h-[5rem] bg-white flex justify-around border-t border-strokeGray">
      <TapItem currentTap={currentTap} targetTap="main" onClick={handleTapClick} icon={<CalenderIcon />} />
      <TapItem currentTap={currentTap} targetTap="monthWeek" onClick={handleTapClick} icon={<MonthWeekIcon />} />
      <TapItem currentTap={currentTap} targetTap="chart" onClick={handleTapClick} icon={<ChartIcon />} />
      <TapItem currentTap={currentTap} targetTap="talk" onClick={handleTapClick} icon={<TalkIcon />} />
      <TapItem currentTap={currentTap} targetTap="setting" onClick={handleTapClick} icon={<SettingIcon />} />
    </div>
  );
};

export default TapBar;
