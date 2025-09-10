import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { MAX_MEMBER_COUNT_OPTIONS } from '@/constants/options';
import { ChatroomSchema } from '@/schemas/chatSchema';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import EditChatroomForm from '@/pages/EditChatroomPage/components/EditChatroomForm';
import TrashButton from '@/components/button/icon/TrashButton';
import useLeaveChatroom from '@/hooks/apis/chat/useLeaveChatroom';
import useModal from '@/hooks/useModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import ConsentModal from '@/components/modal/chat/ConsentModal';
import { HOST_LEAVE_CHATROOM_NOTICE } from '@/constants/modal';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const EditChatroomPage = () => {
  const navigate = useNavigate();
  const methods = useForm<ChatroomFormDataType>({
    defaultValues: {
      chatroomImage: undefined,
      chatroomTitle: '',
      description: '',
      hashtags: [],
      isRankingEnabled: false,
      chatroomPassword: '',
      isDefaultProfile: true,
      maxMemberCount: MAX_MEMBER_COUNT_OPTIONS[0].value,
    },
    resolver: zodResolver(ChatroomSchema),
    mode: 'onChange',
  });
  const { chatroomId } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: leaveChatroom, isPending: isLeavePending } = useLeaveChatroom();

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label="채팅방 편집"
        rightButton={<TrashButton onClick={openModal} />}
      />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <FormProvider {...methods}>
            <EditChatroomForm />
          </FormProvider>
        </FetchErrorBoundary>
        {isOpen && (
          <ModalDimmed onClose={closeModal}>
            <ConsentModal
              content={HOST_LEAVE_CHATROOM_NOTICE}
              leftButtonLabel="나가기"
              onClick={() => leaveChatroom(chatroomId!)}
              rightButtonLabel="취소"
              onClose={closeModal}
              isPending={isLeavePending}
            />
          </ModalDimmed>
        )}
      </PageErrorBoundary>
    </div>
  );
};

export default EditChatroomPage;
