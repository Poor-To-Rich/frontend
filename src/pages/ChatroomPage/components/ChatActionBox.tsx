import { stompClient } from '@/api/stomp';
import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import XIconButton from '@/components/button/icon/XIconButton';
import SubActionButton from '@/components/button/SubActionButton';
import useUploadChatroomPhoto from '@/hooks/apis/photo/useUploadChatroomPhoto';
import { createFormData } from '@/utils/form/createFormData';
import { useRef, useState } from 'react';

interface Props {
  chatroomId: number;
}

const ChatActionBox = ({ chatroomId }: Props) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: uploadChatroomPhoto } = useUploadChatroomPhoto(String(chatroomId), setPhotoFile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhotoFile(file);
    }

    e.target.value = '';
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSendTextMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = textareaRef.current?.value;
    if (!text) return;

    stompClient.publish({
      destination: `/pub/chat/messages`,
      body: JSON.stringify({
        chatroomId,
        messageType: 'TEXT',
        content: text,
      }),
    });

    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleSendPhotoMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) return;

    const body = createFormData({
      chatroomId: chatroomId,
      photo: photoFile,
    });

    uploadChatroomPhoto(body);
  };

  return (
    <div className="sticky bottom-0">
      {photoFile && (
        <div className="w-full flex justify-center bg-strokeGray/30 relative">
          <XIconButton className="absolute right-0" onClick={() => setPhotoFile(null)} />
          <img className="w-1/2 aspect-square object-cover" src={URL.createObjectURL(photoFile)} />
        </div>
      )}
      <form
        className="flex items-end w-full p-2.5 bg-white border-t border-strokeGray gap-2.5"
        onSubmit={photoFile ? handleSendPhotoMessage : handleSendTextMessage}>
        <ImageUploadButton handleImageChange={handleImageChange} />
        <textarea
          id="text"
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
          placeholder="메시지를 입력하세요"
          className="w-full max-h-[8rem] overflow-y-auto resize-none bg-strokeGray rounded-lg px-3 py-2 outline-none placeholder-defaultGrey custom-scrollbar"
        />
        <div className="h-12 mb-0.5">
          <SubActionButton type="submit" label="전송" />
        </div>
      </form>
    </div>
  );
};

export default ChatActionBox;
