import { RANKING_ANNOUNCEMENT_MESSAGE, RANKING_DISABLED_MESSAGE } from '@/constants/message';
import { RankingStatusMessageType } from '@/types/messageType';

const RankingStatusMessage = ({ isChatEnabled }: RankingStatusMessageType) => {
  const message = isChatEnabled ? RANKING_ANNOUNCEMENT_MESSAGE : RANKING_DISABLED_MESSAGE;

  return (
    <div className="bg-oliveGreen p-10 rounded-3xl ">
      <p className="whitespace-pre-wrap text-center" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};

export default RankingStatusMessage;
