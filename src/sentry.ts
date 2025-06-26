import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.DEV ? undefined : import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.3,
  environment: import.meta.env.MODE,
});
