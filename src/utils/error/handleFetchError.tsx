import { getFetchFallbackByStatus } from '@/components/error/getFetchFallbackByStatus';
import { isFetchError } from '@/utils/error/isFetchError';
import * as Sentry from '@sentry/react';

export const handleFetchError = (error: unknown) => {
  if (isFetchError(error)) {
    Sentry.captureException(error);

    return (
      <div className="w-full grow flex flex-col justify-center items-center gap-3.5 p-5">
        {getFetchFallbackByStatus(error)}
      </div>
    );
  }

  throw error;
};
