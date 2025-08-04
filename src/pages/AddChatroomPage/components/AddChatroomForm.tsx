import ChatroomFormContent from '@/components/form/ChatroomFormContent';
import useAddChatroom from '@/hooks/apis/chat/useAddChatroom';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { createFormData } from '@/utils/form/createFormData';
import { useFormContext } from 'react-hook-form';

const AddChatroomForm = () => {
  const {
    handleSubmit,
    formState: { isValid, dirtyFields },
  } = useFormContext<ChatroomFormDataType>();
  const { mutate: addChatroom, isPending } = useAddChatroom();

  const onSubmit = (formData: ChatroomFormDataType) => {
    const isImageDirty = dirtyFields.chatroomImage === true;
    const body = createFormData(formData, isImageDirty, 'chatroomImage');
    addChatroom(body);
  };

  return <ChatroomFormContent onSubmit={handleSubmit(onSubmit)} isPending={isPending} isValid={isValid} />;
};

export default AddChatroomForm;
