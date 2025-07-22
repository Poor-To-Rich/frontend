import { DropDownMenuOption } from '@/types/propsTypes';
import DropdownMenuBase from '@/components/menu/DropdownMenuBase';

const SingleChatroomDropdown = () => {
  const options: DropDownMenuOption[] = [{ label: '방장 위임' }, { label: '채팅방 나가기', danger: true }];
  return <DropdownMenuBase options={options} />;
};

export default SingleChatroomDropdown;
