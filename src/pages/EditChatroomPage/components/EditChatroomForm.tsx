import ChatroomFormContent from '@/components/form/ChatroomFormContent';
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
  const { data: chatroomData } = useGetChatroom(chatroomId!);
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

  return (
    <ChatroomFormContent
      onSubmit={handleSubmit(onSubmit)}
      isPending={isEditPending}
      disabled={!isValid || !(Object.keys(dirtyFields).length > 0)}
    />
  );
};

export default EditChatroomForm;
