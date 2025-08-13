import { stompClient } from '@/api/stomp';
import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import SubActionButton from '@/components/button/SubActionButton';
import { useRef } from 'react';

interface Props {
  chatroomId: number;
}

const ChatActionBox = ({ chatroomId }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = textareaRef.current?.value.trim();
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

  return (
    <form
      className="sticky bottom-0 flex items-end w-full p-2.5 bg-white border-t border-strokeGray gap-2.5"
      onSubmit={handleSendMessage}>
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
    </form>
  );
};

export default ChatActionBox;
