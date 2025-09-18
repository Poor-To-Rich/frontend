import * as Sentry from '@sentry/react';
import PrimaryButton from '@/components/button/PrimaryButton';
import { SentryFallbackProps } from '@/types/types';
import { BiShocked } from 'react-icons/bi';

const GlobalFallback = ({ error }: SentryFallbackProps) => {
  const message = error instanceof Error ? `Error: ${error.message}` : '잠시후에 다시 시도해주십시오.';

  // 🔍 동적 import 실패 감지
  const isChunkLoadError =
    error instanceof Error &&
    (error.message.includes('dynamically imported module') ||
      error.message.includes('Importing a module script failed'));

  if (isChunkLoadError) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-5">
        <h2 className="text-xl font-bold">새 버전이 배포되었습니다.</h2>
        <p>최신 버전으로 새로고침 해주세요.</p>
        <PrimaryButton label="새로고침" onClick={() => window.location.reload()} color="bg-lightBlue text-oceanBlue" />
      </div>
    );
  }

  // 기본 글로벌 에러 처리
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-5">
      <BiShocked size={75} color="gray" />
      <h2 className="text-xl font-bold">예기치 못한 문제가 발생했습니다.</h2>
      <p>서비스 이용에 불편을 드려 죄송합니다.</p>
      <p className="text-defaultGrey">{message}</p>
      <PrimaryButton label="새로고침" onClick={() => window.location.reload()} color="bg-lightBlue text-oceanBlue" />
    </div>
  );
};

const GlobalErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sentry.ErrorBoundary
      onError={error => {
        Sentry.captureException(error);
      }}
      fallback={(props: SentryFallbackProps) => <GlobalFallback {...props} />}
      showDialog={false}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
