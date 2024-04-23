import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  DEFAULT_LOADING_CONFIGURATION,
  LOADING_CONFIGURATION,
  LoadingConfiguration,
} from './configuration/loading.configuration';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { LoadingComponent } from './loading.component';
import { MaterialModule } from './material.module';
import { LoadingService } from './service/loading.service';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, OverlayModule, MaterialModule],
  exports: [LoadingComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    LoadingService,
    { provide: LOADING_CONFIGURATION, useValue: DEFAULT_LOADING_CONFIGURATION },
  ],
})
export class LoadingModule {
  static forRoot(
    configuration: Partial<LoadingConfiguration>
  ): ModuleWithProviders<LoadingModule> {
    return {
      ngModule: LoadingModule,
      providers: [
        {
          provide: LOADING_CONFIGURATION,
          useValue: { ...DEFAULT_LOADING_CONFIGURATION, ...configuration },
        },
      ],
    };
  }
}
