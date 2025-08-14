import DefaultHeader from '@/components/header/DefaultHeader';
import LabelButton from '@/components/button/LabelButton';

interface Props {
  onLeftClick?: () => void;
  onRightClick?: () => void;
  buttonLabel: string;
  disabled?: boolean;
}

const ChatroomEditHeader = ({ onLeftClick, onRightClick, buttonLabel, disabled }: Props) => {
  return (
    <DefaultHeader
      leftButton={<LabelButton label="완료" onClick={onLeftClick} />}
      label="편집"
      rightButton={<LabelButton label={buttonLabel} disabled={disabled} onClick={onRightClick} />}
    />
  );
};

export default ChatroomEditHeader;
