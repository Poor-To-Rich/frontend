import DropdownMenuBase from '@/components/menu/DropdownMenuBase';
import { useMarkAllChatroomsAsRead } from '@/hooks/apis/chat/useMarkAllChatroomsAsRead';
import { ChatroomViewModeValue } from '@/types/chatTypes';
import { DropDownMenuOption } from '@/types/propsTypes';

interface Props {
  viewMode: ChatroomViewModeValue;
  closeMenu: () => void;
  openModal: () => void;
}

const GlobalChatroomDropDown = ({ viewMode, closeMenu, openModal }: Props) => {
  const { mutate: allChatroomRead } = useMarkAllChatroomsAsRead(closeMenu);
  const joinedOptions: DropDownMenuOption[] = [
    { label: '채팅방 편집' },
    { label: '모두 읽음', onClick: allChatroomRead },
  ];

  const commonOptions: DropDownMenuOption[] = [
    {
      label: '랭킹 기능',
      onClick: () => {
        openModal();
        closeMenu();
      },
    },
  ];

  const options = viewMode === 'joined' ? [...joinedOptions, ...commonOptions] : [...commonOptions];

  return <DropdownMenuBase options={options} />;
};

export default GlobalChatroomDropDown;
