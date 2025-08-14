import { SystemMessageType } from '@/types/messageType';

const SystemMessage = ({ content }: SystemMessageType) => {
  return <div className="w-fit bg-strokeGray text-md text-white text-center rounded-4xl px-10 py-1.5">{content}</div>;
};

export default SystemMessage;
