import { DropDownMenuOption } from '@/types/propsTypes';
import DropdownMenuBase from '@/components/menu/DropdownMenuBase';
import { useNavigate } from 'react-router-dom';

interface Props {
  chatroomId: string;
  openModal: () => void;
  isHost: boolean;
}

const SingleChatroomDropdown = ({ chatroomId, openModal, isHost }: Props) => {
  const navigate = useNavigate();
  const options: DropDownMenuOption[] = [
    ...(isHost ? [{ label: '방장 위임', onClick: () => navigate(`/chat/chatroom/host/delegate/${chatroomId}`) }] : []),
    { label: '채팅방 나가기', danger: true, onClick: openModal },
  ];
  return <DropdownMenuBase options={options} />;
};

export default SingleChatroomDropdown;
