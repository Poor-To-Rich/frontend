import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import SubActionButton from '@/components/button/SubActionButton';
import { useRef } from 'react';

const ChatActionBox = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="flex items-end w-full p-2.5 bg-white border-t border-strokeGray gap-2.5">
      <ImageUploadButton />
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        rows={1}
        placeholder="메시지를 입력하세요"
        className="w-full max-h-[8rem] overflow-y-auto resize-none bg-strokeGray rounded-lg px-3 py-2 outline-none placeholder-defaultGrey custom-scrollbar"
      />
      <div className="h-12 mb-0.5">
        <SubActionButton type="submit" label="전송" />
      </div>
    </div>
  );
};

export default ChatActionBox;
