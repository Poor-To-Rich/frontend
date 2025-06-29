import { useState, useEffect } from 'react';
import ModalDimmed from '@/components/modal/ModalDimmed';
import InstallSteps from '@/components/modal/InstallSteps';

interface Props {
  closeModal: () => void;
}

const PWAInstallModal = ({ closeModal }: Props) => {
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (/iPhone|iPad|iPod/.test(userAgent) || (userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1)) {
      setDeviceType('ios');
    } else if (/Android/.test(userAgent)) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  const benefits = [
    '홈 화면에서 바로 실행',
    '오프라인에서도 이용 가능',
    '더 빠른 로딩 속도',
    '네이티브 앱과 같은 경험',
  ];

  return (
    <ModalDimmed>
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-strokeGray">
          <h2 className="text-xl font-semibold text-gray-900">앱으로 설치하기</h2>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">앱을 설치하면 더 빠르고 편리하게 이용할 수 있어요!</p>
          </div>

          <InstallSteps deviceType={deviceType} />

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">앱 설치의 장점</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-strokeGray">
          <button
            onClick={closeModal}
            className="w-full bg-gray-100 cursor-pointer text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            나중에 설치하기
          </button>
        </div>
      </div>
    </ModalDimmed>
  );
};

export default PWAInstallModal;
