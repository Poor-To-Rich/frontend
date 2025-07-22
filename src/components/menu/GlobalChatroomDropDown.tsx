import DropdownMenuBase from '@/components/menu/DropdownMenuBase';
import { DropDownMenuOption } from '@/types/propsTypes';

const GlobalChatroomDropDown = () => {
  const options: DropDownMenuOption[] = [{ label: '채팅방 편집' }, { label: '랭킹 기능' }, { label: '모두 읽음' }];
  return <DropdownMenuBase options={options} />;
};

export default GlobalChatroomDropDown;
