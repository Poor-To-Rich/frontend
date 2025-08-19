import { DropDownMenuOption } from '@/types/propsTypes';
import DropdownMenuBase from '@/components/menu/DropdownMenuBase';

interface Props {
  openModal: () => void;
}

const SingleChatroomDropdown = ({ openModal }: Props) => {
  const options: DropDownMenuOption[] = [
    { label: '방장 위임' },
    { label: '채팅방 나가기', danger: true, onClick: openModal },
  ];
  return <DropdownMenuBase options={options} />;
};

export default SingleChatroomDropdown;
