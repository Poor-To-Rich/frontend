import DefaultHeader from '@/components/header/DefaultHeader';
import DefaultModal from '@/components/modal/DefaultModal';
import TapBar from '@/components/tapbar/TapBar';
import { ACCOUNT_OPTIONS, DATA_OPTIONS, INFORMATION_OPTIONS } from '@/constants/options';
import useLogout from '@/hooks/apis/auth/useLogout';
import useResetData from '@/hooks/apis/auth/useResetData';
import LabelContainer from '@/pages/SettingPage/components/LabelContainer';
import { ModalType, SettingOptionType } from '@/types/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const navigate = useNavigate();
  const [selectedModal, setSelectedModal] = useState<ModalType>(null);
  const { mutate: logout } = useLogout();
  const { mutate: resetData } = useResetData({ closeModal: () => setSelectedModal(null) });

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
    <div className="flex flex-col w-full min-h-screen max-h-fit relative">
      <div className="grow">
        <DefaultHeader label="환경설정" />
        <LabelContainer label="계정" options={ACCOUNT_OPTIONS} handleClick={handleOptionClick} />
        <LabelContainer label="데이터" options={DATA_OPTIONS} handleClick={handleOptionClick} />
        <LabelContainer label="정보" options={INFORMATION_OPTIONS} handleClick={handleOptionClick} />
      </div>
      <TapBar page="setting" />
      {selectedModal === 'logout' && (
        <DefaultModal content="로그아웃 하시겠습니까?" onClick={logout} onClose={handleModalClose} />
      )}
      {selectedModal === 'dataReset' && (
        <DefaultModal
          content={`초기화하게 되면\n입력된 모든 가계부 데이터가 삭제됩니다.\n전체 데이터를 초기화 하시겠습니까?`}
          onClick={resetData}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SettingPage;
