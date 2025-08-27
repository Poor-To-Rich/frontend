import { getFetchFallbackByStatus } from '@/components/error/getFetchFallbackByStatus';
import { isFetchError } from '@/utils/error/isFetchError';
import * as Sentry from '@sentry/react';

export const handleFetchError = (error: unknown) => {
  if (isFetchError(error)) {
    Sentry.captureException(error, {
      extra: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        code: error.code,
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseHeaders: error.response?.headers,
        responseData: error.response?.data,
      },
    });

    return (
      <div className="w-full grow flex flex-col justify-center items-center gap-3.5 p-5">
        {getFetchFallbackByStatus(error)}
      </div>
    );
  }

  throw error;
};
