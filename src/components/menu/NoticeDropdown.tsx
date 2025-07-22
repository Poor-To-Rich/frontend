import { DropDownMenuOption } from '@/types/propsTypes';
import DropdownMenuBase from '@/components/menu/DropdownMenuBase';

const NoticeDropdown = () => {
  const options: DropDownMenuOption[] = [{ label: '수정하기' }, { label: '삭제하기', danger: true }];
  return <DropdownMenuBase options={options} />;
};

export default NoticeDropdown;
