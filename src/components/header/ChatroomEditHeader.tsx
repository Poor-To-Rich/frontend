import DefaultHeader from '@/components/header/DefaultHeader';
import LabelButton from '@/components/button/LabelButton';

interface Props {
  buttonLabel: string;
  disabled?: boolean;
}

const ChatroomEditHeader = ({ buttonLabel, disabled }: Props) => {
  return (
    <DefaultHeader
      leftButton={<LabelButton label="완료" />}
      label="편집"
      rightButton={<LabelButton label={buttonLabel} disabled={disabled} />}
    />
  );
};

export default ChatroomEditHeader;
