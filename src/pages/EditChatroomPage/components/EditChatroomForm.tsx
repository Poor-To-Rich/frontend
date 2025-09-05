import ChatroomFormContent from '@/components/form/ChatroomFormContent';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useEditChatroom from '@/hooks/apis/chat/useEditChatroom';
import useGetChatroom from '@/hooks/apis/chat/useGetChatroom';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { createFormData } from '@/utils/form/createFormData';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const EditChatroomForm = () => {
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isValid, dirtyFields },
  } = useFormContext<ChatroomFormDataType>();
  const { chatroomId } = useParams();
  const { data: chatroomData, isPending: isGetChatroomDataPending } = useGetChatroom(chatroomId!);
  const { mutate: editChatroom, isPending: isEditPending } = useEditChatroom(chatroomId!, setError);

  const onSubmit = (formData: ChatroomFormDataType) => {
    const isImageDirty = dirtyFields.chatroomImage === true;
    const body = createFormData(formData, isImageDirty, 'chatroomImage');
    editChatroom(body);
  };

  useEffect(() => {
    if (chatroomData) {
      reset({
        ...chatroomData,
        chatroomImage: chatroomData.chatroomImage ?? undefined,
        chatroomPassword: chatroomData.chatroomPassword ?? '',
      });
    }
  }, [reset, chatroomData]);

  if (isGetChatroomDataPending) {
    return (
      <div className="flex flex-grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <ChatroomFormContent
      onSubmit={handleSubmit(onSubmit)}
      isPending={isEditPending}
      disabled={!isValid || !(Object.keys(dirtyFields).length > 0)}
    />
  );
};

export default EditChatroomForm;
