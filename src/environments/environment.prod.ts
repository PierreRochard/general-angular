export const environment = {
  production: true,
  restConfig: {
    apiBaseTemplate: 'https://{schema}.rochard.org',
    defaultTimeoutMs: 5000,
    retryCount: 2,
    retryDelayMs: 200,
  }
};
