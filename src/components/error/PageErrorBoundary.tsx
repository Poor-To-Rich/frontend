import * as Sentry from '@sentry/react';
import ServerErrorFallback from './fallbacks/ServerErrorFallback';
import PrimaryButton from '@/components/button/PrimaryButton';
import { LuFileWarning } from 'react-icons/lu';
import { SentryFallbackProps } from '@/types/types';
import CustomError from '@/utils/error/CustomError';

const PageFallback = ({ error }: SentryFallbackProps) => {
  if (error instanceof CustomError && error.statusCode >= 500) {
    return <ServerErrorFallback />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-7">
      <LuFileWarning size={70} color={'gray'} />
      <h1 className="text-xl font-bold">페이지를 불러오는 데 문제가 발생했습니다.</h1>
      <p>다시 시도하거나 이전 페이지로 돌아가주세요.</p>
      <PrimaryButton label="새로고침" onClick={() => window.location.reload()} color={'bg-lightBlue text-oceanBlue'} />
      <PrimaryButton label="이전" onClick={() => window.history.back()} color={'bg-strokeGray text-defaultGrey'} />
    </div>
  );
};

const PageErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sentry.ErrorBoundary
      onError={error => {
        Sentry.captureException(error);
      }}
      fallback={(props: SentryFallbackProps) => <PageFallback {...props} />}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default PageErrorBoundary;
