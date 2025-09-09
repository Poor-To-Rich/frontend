import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddChatroomForm from '@/pages/AddChatroomPage/components/AddChatroomForm';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatroomSchema } from '@/schemas/chatSchema';
import { MAX_MEMBER_COUNT_OPTIONS } from '@/constants/options';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const AddChatroomPage = () => {
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

  return (
    <div>
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} label="채팅방 추가" />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <FormProvider {...methods}>
            <AddChatroomForm />
          </FormProvider>
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default AddChatroomPage;
