import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TestBed } from '@angular/core/testing';
import {
  DEFAULT_LOADING_CONFIGURATION,
  LOADING_CONFIGURATION,
} from '../configuration/loading.configuration';
import { LoadingComponent } from '../loading.component';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;
  let overlay: Overlay;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        Overlay,
        LoadingService,
        {
          provide: LOADING_CONFIGURATION,
          useValue: DEFAULT_LOADING_CONFIGURATION,
        },
      ],
    }).compileComponents();

    overlay = TestBed.inject(Overlay);
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use the overlay to show and hide the loading component', () => {
    const attachSpy = spyOn(service.overlayRef, 'attach');
    const detachSpy = spyOn(service.overlayRef, 'detach');

    service['configuration'].loadingComponent = LoadingComponent;

    service.show();
    expect(attachSpy).toHaveBeenCalledWith(
      new ComponentPortal(LoadingComponent)
    );

    service.hide();
    expect(detachSpy).toHaveBeenCalled();
  });
});
