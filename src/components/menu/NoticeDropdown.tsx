import { DropDownMenuOption } from '@/types/propsTypes';
import DropdownMenuBase from '@/components/menu/DropdownMenuBase';
import useDeleteNotice from '@/hooks/apis/notice/useDeleteNotice';
import { useNavigate } from 'react-router-dom';

interface Props {
  chatroomId: string;
  noticeId: number;
}

const NoticeDropdown = ({ chatroomId, noticeId }: Props) => {
  const navigate = useNavigate();
  const { mutate: deleteNotice } = useDeleteNotice(chatroomId!, noticeId!);

  const options: DropDownMenuOption[] = [
    { label: '수정하기', onClick: () => navigate(`/chat/chatroom/${chatroomId}/notices/${noticeId}/edit`) },
    { label: '삭제하기', danger: true, onClick: () => deleteNotice() },
  ];

  return <DropdownMenuBase options={options} />;
};

export default NoticeDropdown;
