import { stompClient } from '@/api/stomp';
import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import XIconButton from '@/components/button/icon/XIconButton';
import SubActionButton from '@/components/button/SubActionButton';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useUploadChatroomPhoto from '@/hooks/apis/photo/useUploadChatroomPhoto';
import { scrollToBottom } from '@/utils/chat/scrollToBottom';
import { isIOSPWA } from '@/utils/deviceUtils';
import { createFormData } from '@/utils/form/createFormData';
import { compressImage } from '@/utils/image';
import clsx from 'clsx';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  chatroomId: number;
  isChatDisabled?: boolean;
  scrollRef?: MutableRefObject<HTMLDivElement | null>;
}

const ChatActionBox = ({ chatroomId, isChatDisabled, scrollRef }: Props) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClearPhotoStatus = () => {
    setPhotoFile(null);
    setIsPhotoLoading(false);
  };

  const { mutate: uploadChatroomPhoto, isPending: isUploadPhotoPending } = useUploadChatroomPhoto(
    String(chatroomId),
    handleClearPhotoStatus,
    scrollRef,
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsPhotoLoading(true);
      setIsCompressing(true);
      const compressedFile = await compressImage(file);

      setPhotoFile(compressedFile);
    } catch (error) {
      console.error('압축 실패:', error);
      toast.error(error instanceof Error ? error.message : '사진 업로드 실패');
      setIsPhotoLoading(false);
    } finally {
      setIsCompressing(false);
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

    if (scrollRef) {
      setTimeout(() => scrollToBottom(scrollRef, 'instant'), 0);
    }

    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.focus();
    }
  };

  const handleSendPhotoMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile || isCompressing || isUploadPhotoPending) return;

    const body = createFormData({
      photo: photoFile,
    });

    uploadChatroomPhoto(body);
  };

  useEffect(() => {
    if (!photoFile) return;

    const previewUrl = URL.createObjectURL(photoFile);
    setPreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [photoFile]);

  return (
    <div className={clsx(isIOSPWA && 'pb-[3rem]', 'sticky bottom-0 ')}>
      {isPhotoLoading && (
        <div className="w-full aspect-[2/1] flex justify-center bg-strokeGray/30 relative">
          <XIconButton className="absolute right-0" onClick={handleClearPhotoStatus} />
          {photoFile && previewUrl ? (
            <img className="w-1/2 aspect-square object-cover" src={previewUrl} />
          ) : (
            <div className="flex justify-center items-center flex-grow ">
              <LoadingSpinner size={30} color="black" />
            </div>
          )}
        </div>
      )}
      <form
        className="flex items-end w-full p-2.5 bg-white border-t border-strokeGray gap-2.5"
        onSubmit={e => e.preventDefault()}>
        {isChatDisabled ? (
          <p className="w-full h-12 mb-0.5 flex items-center justify-center">대화할 수 없는 상태입니다.</p>
        ) : (
          <>
            <ImageUploadButton handleImageChange={handleImageChange} />

            <textarea
              id="text"
              ref={textareaRef}
              onKeyDown={e => {
                const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

                if (!isMobile && e.key === 'Enter' && !e.shiftKey && !(e.nativeEvent as any).isComposing) {
                  e.preventDefault();
                  if (photoFile) {
                    handleSendPhotoMessage(e as unknown as React.FormEvent);
                  } else {
                    handleSendTextMessage(e as unknown as React.FormEvent);
                  }
                }
              }}
              placeholder="메시지를 입력하세요"
              className="w-full min-h-[3rem] max-h-[6rem] overflow-y-auto resize-none bg-lightGray rounded-lg px-3 py-2 outline-none placeholder-defaultGrey custom-scrollbar"
            />

            <div className="h-12 mb-0.5">
              <SubActionButton
                label="전송"
                onClick={photoFile ? handleSendPhotoMessage : handleSendTextMessage}
                isPending={isUploadPhotoPending}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ChatActionBox;
