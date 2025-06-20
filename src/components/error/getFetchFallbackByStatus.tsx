import CustomError from '@/utils/error/CustomError';
import ForbiddenFallback from '@/components/error/fallbacks/ForbiddenFallback';
import NotFoundFallback from '@/components/error/fallbacks/NotFoundFallback';
import DefaultErrorFallback from '@/components/error/fallbacks/DefaultErrorFallback';

export const getFetchFallbackByStatus = (error: CustomError) => {
  const status = error.statusCode;

  switch (status) {
    case 403:
      return <ForbiddenFallback />;
    case 404:
      return <NotFoundFallback />;
    default:
      return <DefaultErrorFallback message={error.message} />;
  }
};
