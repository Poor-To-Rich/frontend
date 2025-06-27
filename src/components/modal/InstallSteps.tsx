import { DeviceConfig } from '@/types/types';
import { Share, MoreVertical, Download } from 'lucide-react';
import StepItem from '@/components/modal/StepItem';

interface Props {
  deviceType: string;
}

const InstallSteps = ({ deviceType }: Props) => {
  const deviceConfigs: Record<string, DeviceConfig> = {
    ios: {
      title: 'ios에서 앱 설치하기',
      subtitle: 'Safari, Chrome 브라우저에서 권장됩니다',
      steps: [
        {
          title: '공유 버튼 찾기',
          description: '공유 버튼을 탭하세요',
          icon: <Share className="inline w-4 h-4 mx-1" />,
        },
        {
          title: '홈 화면에 추가',
          description: '"홈 화면에 추가" 옵션을 선택하세요',
        },
        {
          title: '설치 완료',
          description: '"추가" 버튼을 눌러 홈 화면에 앱을 설치하세요',
        },
      ],
    },
    android: {
      title: 'Android에서 앱 설치하기',
      subtitle: 'Chrome 브라우저에서 권장됩니다',
      steps: [
        {
          title: '메뉴 열기',
          description: '우상단 메뉴 버튼을 탭하세요',
          icon: <MoreVertical className="inline w-4 h-4 mx-1" />,
        },
        {
          title: '앱 설치 선택',
          description: '"앱 설치" 또는 "홈 화면에 추가" 옵션을 선택하세요',
          icon: <Download className="inline w-4 h-4 mx-1" />,
        },
        {
          title: '설치 완료',
          description: '"설치" 버튼을 눌러 앱을 설치하세요',
        },
      ],
    },
    desktop: {
      title: '데스크톱에서 앱 설치하기',
      subtitle: 'Chrome 또는 Edge 브라우저에서 가능합니다',
      steps: [
        {
          title: '설치 아이콘 클릭',
          description: '주소창 우측의 설치 아이콘을 클릭하세요',
        },
        {
          title: '설치 확인',
          description: '"설치" 버튼을 클릭하여 앱을 설치하세요',
        },
      ],
    },
  };

  const currentConfig = deviceConfigs[deviceType];

  if (!currentConfig) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentConfig.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{currentConfig.subtitle}</p>
      </div>

      <div className="space-y-4">
        {currentConfig.steps.map((step, index) => (
          <StepItem key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};
export default InstallSteps;
