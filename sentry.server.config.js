// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENV;

Sentry.init({
  dsn:
    'https://6fb0dd07e0fc4a75b0ab84b8e1f36460@o183917.ingest.sentry.io/6292602',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps

  environment: process.env.NEXT_PUBLIC_ENV,
  integrations: [Sentry.captureConsoleIntegration()],
  enabled:
    ENVIRONMENT === 'production' ||
    ENVIRONMENT === 'staging' ||
    ENVIRONMENT === 'development',
  beforeSend(event) {
    if (event.request?.cookies['hackneyToken']) {
      event.request.cookies['hackneyToken'] = '[FilteredBeforeSend]';
    }
    if (event.request?.cookies['housing_user']) {
      event.request.cookies['housing_user'] = '[FilteredBeforeSend]';
    }
    return event;
  },
});
