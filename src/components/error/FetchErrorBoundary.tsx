import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { isFetchError } from '@/utils/error/isFetchError';
import { getFetchFallbackByStatus } from '@/components/error/getFetchFallbackByStatus';

const FetchFallback = ({ error }: FallbackProps) => {
  if (isFetchError(error)) {
    return (
      <div className="w-full grow flex flex-col justify-center items-center gap-3.5 p-5">
        {getFetchFallbackByStatus(error)}
      </div>
    );
  }

  // PageErrorBoundary로 throw
  throw error;
};

const FetchErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary FallbackComponent={FetchFallback}>{children}</ErrorBoundary>;
};

export default FetchErrorBoundary;
