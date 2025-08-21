import { stompClient } from '@/api/stomp';
import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import XIconButton from '@/components/button/icon/XIconButton';
import SubActionButton from '@/components/button/SubActionButton';
import useUploadChatroomPhoto from '@/hooks/apis/photo/useUploadChatroomPhoto';
import { createFormData } from '@/utils/form/createFormData';
import { useRef, useState } from 'react';

interface Props {
  chatroomId: number;
  isClosed?: boolean;
}

const ChatActionBox = ({ chatroomId, isClosed }: Props) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: uploadChatroomPhoto } = useUploadChatroomPhoto(String(chatroomId), setPhotoFile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhotoFile(file);
    }

    e.target.value = '';
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
    }
  };

  const handleSendPhotoMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) return;

    const body = createFormData({
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
        onSubmit={e => e.preventDefault()}>
        {isClosed ? (
          <p className="w-full h-12 mb-0.5 flex items-center justify-center">대화할 수 없는 상태입니다.</p>
        ) : (
          <>
            <ImageUploadButton handleImageChange={handleImageChange} />
            <textarea
              id="text"
              ref={textareaRef}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
                  e.preventDefault();
                  if (photoFile) {
                    handleSendPhotoMessage(e as unknown as React.FormEvent);
                  } else {
                    handleSendTextMessage(e as unknown as React.FormEvent);
                  }
                }
              }}
              placeholder="메시지를 입력하세요"
              className="w-full h-[6rem] overflow-y-auto resize-none bg-lightGray rounded-lg px-3 py-2 outline-none placeholder-defaultGrey custom-scrollbar"
            />
            <div className="h-12 mb-0.5">
              <SubActionButton label="전송" onClick={photoFile ? handleSendPhotoMessage : handleSendTextMessage} />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ChatActionBox;
