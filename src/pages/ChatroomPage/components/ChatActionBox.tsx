import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { stompClient } from '@/api/stomp';
import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import XIconButton from '@/components/button/icon/XIconButton';
import SubActionButton from '@/components/button/SubActionButton';
import ModalDimmed from '@/components/modal/ModalDimmed';
import useUploadChatroomPhoto from '@/hooks/apis/photo/useUploadChatroomPhoto';
import useModal from '@/hooks/useModal';
import { scrollToBottom } from '@/utils/chat/scrollToBottom';
import { createFormData } from '@/utils/form/createFormData';
import { compressImage } from '@/utils/image';
import { MutableRefObject, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  chatroomId: number;
  isClosed?: boolean;
  scrollRef?: MutableRefObject<HTMLDivElement | null>;
}

const ChatActionBox = ({ chatroomId, isClosed, scrollRef }: Props) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: uploadChatroomPhoto } = useUploadChatroomPhoto(String(chatroomId), setPhotoFile);

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
      const compressedFile = await compressImage(file);

      setPhotoFile(compressedFile);
    } catch (error) {
      console.error('압축 실패:', error);
      toast.error(error instanceof Error ? error.message : '사진 업로드 실패');
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

    if (scrollRef) scrollToBottom(scrollRef, 'instant');

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
            <div className="flex flex-col gap-2.5">
              <SubActionButton label="랭킹" onClick={openModal} />
              <ImageUploadButton handleImageChange={handleImageChange} />
            </div>

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
