import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate } from 'react-router-dom';

const ChatroomPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label={
          <p className="flex max-w-[20rem] items-center justify-center gap-1 font-medium">
            <span className="truncate">ssssssssssssssssssssssssssssssssssssssssssssss</span>
            <span className="shrink-0 text-defaultGrey">50</span>
          </p>
        }
        rightButton={<ChatroomMenuButton />}
      />
    </div>
  );
};

export default ChatroomPage;
