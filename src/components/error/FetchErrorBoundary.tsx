import * as Sentry from '@sentry/react';
import { handleFetchError } from '@/utils/error/handleFetchError';
import { SentryFallbackProps } from '@/types/types';

export const FetchFallback = ({ error }: SentryFallbackProps) => {
  return handleFetchError(error);
};

const FetchErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sentry.ErrorBoundary
      onError={error => {
        Sentry.captureException(error);
      }}
      fallback={(props: SentryFallbackProps) => <FetchFallback {...props} />}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default FetchErrorBoundary;
