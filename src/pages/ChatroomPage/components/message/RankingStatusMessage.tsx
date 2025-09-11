import { RANKING_ANNOUNCEMENT_MESSAGE, RANKING_DISABLED_MESSAGE } from '@/constants/message';
import { RankingStatusMessageType } from '@/types/messageType';

const RankingStatusMessage = ({ isRankingEnabled, messageId }: RankingStatusMessageType) => {
  const message = isRankingEnabled ? RANKING_ANNOUNCEMENT_MESSAGE : RANKING_DISABLED_MESSAGE;

  return (
    <div data-message-id={messageId} className="w-full bg-oliveGreen p-10 rounded-3xl ">
      <p className="whitespace-pre-wrap text-center text-white" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};

export default RankingStatusMessage;
