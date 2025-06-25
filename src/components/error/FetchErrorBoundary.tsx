import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { handleFetchError } from '@/utils/error/handleFetchError';

export const FetchFallback = ({ error }: FallbackProps) => {
  return handleFetchError(error);
};

const FetchErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary FallbackComponent={FetchFallback}>{children}</ErrorBoundary>;
};

export default FetchErrorBoundary;
