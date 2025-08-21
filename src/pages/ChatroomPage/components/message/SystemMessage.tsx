import { SystemMessageType } from '@/types/messageType';
import { format } from 'date-fns';

const SystemMessage = ({ content, messageType }: SystemMessageType) => {
  return (
    <div className="w-fit bg-strokeGray text-md text-white text-center rounded-4xl px-10 py-1.5">
      {messageType === 'DATE' ? format(new Date(content), 'yyyy년 MM월 dd일') : content}
    </div>
  );
};

export default SystemMessage;
