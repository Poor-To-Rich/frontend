import { useNavigate } from 'react-router-dom';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import LabelButton from '@/components/button/LabelButton';

interface Props {
  label: '공지 작성하기' | '공지 수정하기';
  disabled?: boolean;
}

const NoticeEditorHeader = ({ label, disabled }: Props) => {
  const navigate = useNavigate();

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
      label={label}
      rightButton={<LabelButton label="완료" disabled={disabled} />}
    />
  );
};

export default NoticeEditorHeader;
