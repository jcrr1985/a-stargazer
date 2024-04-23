import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import {
  LOADING_CONFIGURATION,
  LoadingConfiguration,
} from '../configuration/loading.configuration';

@Injectable()
export class LoadingService {
  /**
   * true - Allow HTTP Request automatically loading (LoadingInterceptor)
   * false - Prevent HTTP Request automatically loading (LoadingInterceptor)
   */
  useInterceptor = true;

  overlayRef = this.overlay.create({
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    hasBackdrop: true,
  });

  constructor(
    private overlay: Overlay,
    @Inject(LOADING_CONFIGURATION) private configuration: LoadingConfiguration
  ) {}

  show() {
    this.overlayRef.attach(
      new ComponentPortal(this.configuration.loadingComponent)
    );
  }

  hide() {
    this.overlayRef.detach();
  }
}
