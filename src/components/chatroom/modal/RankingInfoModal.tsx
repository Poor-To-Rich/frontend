import RankingQuestionIcon from '@/components/button/icon/RankingQuestionIcon';
import ModalActionButton from '@/components/button/modal/ModalActionButton';
import { rankingDescriptions } from '@/constants/modal';

interface Props {
  closeModal?: () => void;
}

const RankingInfoModal = ({ closeModal }: Props) => {
  return (
    <div className="bg-white rounded-lg max-w-lg w-full overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b border-strokeGray">
        <h2 className="text-xl font-semibold text-gray-900">랭킹 기능</h2>
      </div>

      <div className="p-6">
        <div className="w-full flex justify-center mb-6">
          <RankingQuestionIcon />
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <ul className="text-md text-gray-600 space-y-1">
            {rankingDescriptions.map((desc, index) => (
              <li key={index}>• {desc}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 border-t border-strokeGray">
        <ModalActionButton label="확인" onClick={closeModal} />
      </div>
    </div>
  );
};

export default RankingInfoModal;
