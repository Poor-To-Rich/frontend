import { useNavigate } from 'react-router-dom';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import LabelButton from '@/components/button/LabelButton';

interface Props {
  label: '공지 작성하기' | '공지 수정하기';
  disabled?: boolean;
  onSubmit?: () => void;
}

const NoticeEditorHeader = ({ label, disabled, onSubmit }: Props) => {
  const navigate = useNavigate();

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
      label={label}
      rightButton={<LabelButton label="완료" disabled={disabled} onClick={onSubmit} />}
    />
  );
};

export default NoticeEditorHeader;
