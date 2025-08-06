import SubActionButton from '@/components/button/SubActionButton';
import useEnterChatroom from '@/hooks/apis/chat/useEnterChatroom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PasswordActionBox = () => {
  const { chatroomId } = useParams();
  const [password, setPassword] = useState<string>('');
  const { mutate: enterChatroom, isPending: isEnterPending } = useEnterChatroom(chatroomId!);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enterChatroom({
      chatroomPassword: password,
    });
  };

  return (
    <form className="w-[20rem] h-11 flex items-center gap-2.5" onSubmit={handleSubmit}>
      <input
        className="input-common h-full"
        autoComplete="off"
        name="chatroomPassword"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <SubActionButton type="submit" label="입력" isPending={isEnterPending} />
    </form>
  );
};

export default PasswordActionBox;
