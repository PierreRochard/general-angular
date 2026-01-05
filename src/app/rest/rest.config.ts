import { InjectionToken } from '@angular/core';

export interface RestConfig {
  apiBaseTemplate: string; // e.g., https://{schema}.rochard.org
  defaultTimeoutMs: number;
  retryCount: number;
  retryDelayMs: number;
}

export const REST_CONFIG = new InjectionToken<RestConfig>('REST_CONFIG');
