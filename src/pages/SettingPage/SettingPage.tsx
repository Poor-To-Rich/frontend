import DefaultHeader from '@/components/header/DefaultHeader';
import DefaultModal from '@/components/modal/DefaultModal';
import { ACCOUNT_OPTIONS, DATA_OPTIONS, INFORMATION_OPTIONS } from '@/constants/options';
import LabelContainer from '@/pages/SettingPage/components/LabelContainer';
import { ModalType, SettingOptionType } from '@/types/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const navigate = useNavigate();
  const [selectedModal, setSelectedModal] = useState<ModalType>(null);

  const handleOptionClick = ({ to, modalType, externalUrl }: Omit<SettingOptionType, 'title'>) => {
    if (to) {
      navigate(to);
    }
    if (modalType) {
      setSelectedModal(modalType);
    }
    if (externalUrl) {
      window.location.href = externalUrl;
    }
  };

  const handleModalClose = () => {
    setSelectedModal(null);
  };

  return (
    <div className="w-full min-h-screen max-h-fit relative">
      <DefaultHeader label="환경설정" />
      <LabelContainer label="계정" options={ACCOUNT_OPTIONS} handleClick={handleOptionClick} />
      <LabelContainer label="데이터" options={DATA_OPTIONS} handleClick={handleOptionClick} />
      <LabelContainer label="정보" options={INFORMATION_OPTIONS} handleClick={handleOptionClick} />
      {selectedModal === 'logout' && <DefaultModal content="로그아웃 하시겠습니까?" onClose={handleModalClose} />}
      {selectedModal === 'dataReset' && (
        <DefaultModal content="전체 데이터를 초기화 하시겠습니까?" onClose={handleModalClose} />
      )}
    </div>
  );
};

export default SettingPage;
