import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { stompClient } from '@/api/stomp';
import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import XIconButton from '@/components/button/icon/XIconButton';
import SubActionButton from '@/components/button/SubActionButton';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import ModalDimmed from '@/components/modal/ModalDimmed';
import useUploadChatroomPhoto from '@/hooks/apis/photo/useUploadChatroomPhoto';
import useModal from '@/hooks/useModal';
import { scrollToBottom } from '@/utils/chat/scrollToBottom';
import { createFormData } from '@/utils/form/createFormData';
import { compressImage } from '@/utils/image';
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

  // 랭킹 테스트 관련 코드
  const { isOpen, openModal, closeModal } = useModal();
  const [date, setDate] = useState<string>('');

  const handleTestRanking = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchData<undefined>('POST', endpoints.ranking.rankingTest(String(chatroomId), date));
    } catch (error) {
      console.error('집계 실패:', error);
      alert('랭킹 집계 중 오류가 발생했습니다.');
    } finally {
      closeModal();
      setDate('');
    }
  };

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
    <div className="sticky bottom-0">
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
            <div className="flex flex-col gap-2.5">
              <SubActionButton label="랭킹" onClick={openModal} />
              <ImageUploadButton handleImageChange={handleImageChange} />
            </div>

            <textarea
              id="text"
              ref={textareaRef}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !(e.nativeEvent as any).isComposing) {
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
              <SubActionButton
                label="전송"
                onClick={photoFile ? handleSendPhotoMessage : handleSendTextMessage}
                isPending={isUploadPhotoPending}
              />
            </div>
          </>
        )}
      </form>
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <form
            className="bg-white flex items-center gap-3.5 p-10"
            onClick={e => e.stopPropagation()}
            onSubmit={handleTestRanking}>
            <label>
              날짜 <input className="h-12 border" type="text" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <button className="p-2.5 border " type="submit">
              집계
            </button>
          </form>
        </ModalDimmed>
      )}
    </div>
  );
};

export default ChatActionBox;
