import { SystemMessageType } from '@/types/messageType';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  myUserId: number;
  message: SystemMessageType;
}

const SystemMessage = ({ myUserId, message }: Props) => {
  const { messageType, content, userId } = message;

  let displayContent = content;

  switch (messageType) {
    case 'DATE':
      displayContent = format(new Date(content), 'yyyy년 MM월 dd일 EEEE', { locale: ko });
      break;
    case 'KICK':
      if (myUserId === userId) {
        displayContent = '방장이 회원님을 내보냈습니다.';
      } else {
        displayContent = content;
      }
      break;
    default:
      displayContent = content;
  }

  return (
    <div className="w-fit bg-strokeGray text-md text-white text-center rounded-4xl px-10 py-1.5">{displayContent}</div>
  );
};

export default SystemMessage;
