import { ErrorBoundary } from 'react-error-boundary';
import { FallbackProps } from 'react-error-boundary';
import ServerErrorFallback from './fallbacks/ServerErrorFallback';
import PrimaryButton from '@/components/button/PrimaryButton';
import { LuFileWarning } from 'react-icons/lu';

const PageFallback = ({ error }: FallbackProps) => {
  if (error.statusCode >= 500) {
    return <ServerErrorFallback />;
  }

  return (
    <div className="w-full grow flex flex-col justify-center items-center gap-5">
      <LuFileWarning size={80} color={'red'} />
      <h1 className="text-xl font-bold">페이지를 불러오는 데 문제가 발생했습니다.</h1>
      <p>다시 시도하거나 홈으로 돌아가주세요.</p>
      <PrimaryButton label="새로고침" onClick={() => window.location.reload()} color={'bg-lightBlue text-oceanBlue'} />
      <PrimaryButton
        label="홈으로 이동"
        onClick={() => (window.location.href = '/')}
        color={'bg-strokeGray text-defaultGrey'}
      />
    </div>
  );
};

const PageErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary FallbackComponent={PageFallback}>{children}</ErrorBoundary>;
};

export default PageErrorBoundary;
