import CalenderIcon from '@/components/icon/CalenderIcon';
import MonthWeekIcon from '@/components/icon/MonthWeekIcon';
import ChartIcon from '@/components/icon/ChartIcon';
import TalkIcon from '@/components/icon/TalkIcon';
import SettingIcon from '@/components/icon/SettingIcon';
import { TapBarType } from '@/types/types';
import { useState } from 'react';
import TapItem from '@/components/tapbar/TapItem';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { isIOSPWA } from '@/utils/deviceUtils';

interface Props {
  page: TapBarType;
}

const TapBar = ({ page }: Props) => {
  const [currentTap, setCurrentTap] = useState<TapBarType>(page);
  const navigate = useNavigate();

  const handleTapClick = (value: TapBarType) => {
    const linkUrl = value === 'main' ? '/' : `/${value}`;
    setCurrentTap(value);
    navigate(linkUrl);
  };

  return (
    <div
      className={clsx(
        isIOSPWA ? 'h-[8rem] pb-[3rem]' : 'h-[5rem]',
        'w-full sticky bottom-0 bg-white flex justify-around border-t border-strokeGray',
      )}>
      <TapItem currentTap={currentTap} targetTap="main" onClick={handleTapClick} icon={<CalenderIcon />} />
      <TapItem currentTap={currentTap} targetTap="month-week" onClick={handleTapClick} icon={<MonthWeekIcon />} />
      <TapItem currentTap={currentTap} targetTap="chart" onClick={handleTapClick} icon={<ChartIcon />} />
      <TapItem currentTap={currentTap} targetTap="chat" onClick={handleTapClick} icon={<TalkIcon />} />
      <TapItem currentTap={currentTap} targetTap="setting" onClick={handleTapClick} icon={<SettingIcon />} />
    </div>
  );
};

export default TapBar;
