import { useNavigate } from 'react-router-dom';
import DefaultHeader from '@/components/header/DefaultHeader';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import HelpTooltipButton from '@/components/button/icon/HelpTooltipButton';

const RankingHeader = () => {
  const navigate = useNavigate();

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
      label="랭킹"
      rightButton={<HelpTooltipButton />}
    />
  );
};

export default RankingHeader;
