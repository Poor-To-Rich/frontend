import { DropDownMenuOption } from '@/types/propsTypes';
import DropdownMenuBase from '@/components/menu/DropdownMenuBase';
import { useNavigate } from 'react-router-dom';

interface Props {
  chatroomId: string;
  noticeId: number;
}

const NoticeDropdown = ({ chatroomId, noticeId }: Props) => {
  const navigate = useNavigate();
  const options: DropDownMenuOption[] = [
    { label: '수정하기', onClick: () => navigate(`/chat/chatroom/${chatroomId}/notices/${noticeId}/edit`) },
    { label: '삭제하기', danger: true },
  ];

  return <DropdownMenuBase options={options} />;
};

export default NoticeDropdown;
