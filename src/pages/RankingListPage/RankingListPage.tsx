import HelpTooltipButton from '@/components/button/icon/HelpTooltipButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import RankingInfoModal from '@/components/modal/chat/RankingInfoModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import useGetAllRakingListInfiniteQuery from '@/hooks/apis/ranking/useGetAllRakingListInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useModal from '@/hooks/useModal';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RankingItem from '@/pages/RankingListPage/components/RankingItem';

const RankingListPage = () => {
  const navigate = useNavigate();
  const { chatroom } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllRakingListInfiniteQuery(chatroom!);

  const observerRef = useRef<HTMLLIElement | null>(null);
  const allRankingList = data?.pages?.flatMap(page => page.rankings) || [];
  const isEmpty = allRankingList?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div>
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label="랭킹"
        rightButton={<HelpTooltipButton onClick={openModal} />}
      />
      <ul>
        {allRankingList.map((ranking, index) => (
          <RankingItem {...ranking} hasUnderLine={index < allRankingList.length} />
        ))}
        {!isEmpty && hasNextPage && <li ref={observerRef} className="h-4" />}
      </ul>
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <RankingInfoModal closeModal={closeModal} />
        </ModalDimmed>
      )}
    </div>
  );
};

export default RankingListPage;
