import ChatroomDetailHeader from '@/components/header/ChatroomDetailHeader';
import PhotoPreviewBox from '@/pages/ChatroomDetailPage/components/PhotoPreviewBox';
import { useParams } from 'react-router-dom';
import NoticePreviewBox from '@/pages/ChatroomDetailPage/components/NoticePreviewBox';
import RankingPreviewBox from '@/pages/ChatroomDetailPage/components/RankingPreviewBox';
import ChatMemberBox from '@/pages/ChatroomDetailPage/components/ChatMemberBox';
import ChatActionButton from '@/components/button/ChatActionButton';
import ChatroomProfileBox from '@/pages/ChatroomDetailPage/components/ChatroomProfileBox';
import useLeaveChatroom from '@/hooks/apis/chat/useLeaveChatroom';
import useModal from '@/hooks/useModal';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import ModalDimmed from '@/components/modal/ModalDimmed';
import ConsentModal from '@/components/modal/chat/ConsentModal';
import DefaultModal from '@/components/modal/DefaultModal';
import { HOST_LEAVE_CHATROOM_NOTICE, MEMBER_LEAVE_CHATROOM_NOTICE } from '@/constants/modal';

const ChatroomDetailPage = () => {
  const { chatroomId } = useParams();
  const { data: useRole } = useGetChatroomUserRole(chatroomId!);
  const { mutate: leaverChatroom } = useLeaveChatroom();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="w-full min-h-screen">
      {chatroomId && (
        <>
          <ChatroomDetailHeader chatroomId={chatroomId} openModal={openModal} />
          <div className="flex flex-col gap-3 px-5 py-5">
            <ChatroomProfileBox chatroomId={chatroomId} />
            {/* <PhotoPreviewBox chatroomId={chatroomId} /> */}
            <NoticePreviewBox chatroomId={chatroomId} />
            {/* <RankingPreviewBox chatroomId={chatroomId} /> */}
            {/* <ChatMemberBox chatroomId={chatroomId} /> */}
            <div className="w-full mt-3">
              <ChatActionButton label={'채팅방 나가기'} onClick={openModal} />
            </div>
          </div>
        </>
      )}
      {isOpen && chatroomId && (
        <ModalDimmed onClose={closeModal}>
          (
          {useRole?.chatroomRole === 'HOST' ? (
            <ConsentModal
              content={HOST_LEAVE_CHATROOM_NOTICE}
              leftButtonLabel="나가기"
              rightButtonLabel="취소"
              onClick={() => leaverChatroom(chatroomId)}
              onClose={closeModal}
            />
          ) : (
            <DefaultModal
              content={MEMBER_LEAVE_CHATROOM_NOTICE}
              onClick={() => leaverChatroom(chatroomId)}
              onClose={closeModal}
            />
          )}
          )
        </ModalDimmed>
      )}
    </div>
  );
};

export default ChatroomDetailPage;
