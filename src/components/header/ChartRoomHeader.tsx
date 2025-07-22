import DefaultHeader from '@/components/header/DefaultHeader';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import { useNavigate } from 'react-router-dom';
import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';

const ChartRoomHeader = () => {
  const navigate = useNavigate();

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
      label={
        <div className="max-w-[200px] flex items-center justify-center gap-1.5">
          <span className="truncate font-medium">수다를 곁들인 채팅방</span>
          <span className="text-sm text-defaultGrey font-medium">120</span>
        </div>
      }
      rightButton={<ChatroomMenuButton />}
    />
  );
};

export default ChartRoomHeader;
