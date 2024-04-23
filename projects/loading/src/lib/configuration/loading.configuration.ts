import { InjectionToken } from '@angular/core';
import { LoadingComponent } from '../loading.component';

export interface LoadingConfiguration {
  loadingComponent: any;
  excludeUrls: (string | RegExp)[];
  skipLoadingHeaderName: string;
}

export const LOADING_CONFIGURATION = new InjectionToken(
  'LOADING_CONFIGURATION'
);

export const DEFAULT_LOADING_CONFIGURATION: LoadingConfiguration = {
  loadingComponent: LoadingComponent,
  excludeUrls: [],
  skipLoadingHeaderName: 'X-Skip-Loading',
};
