import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { getTextContent } from '../../../testing/dom-testing-utils';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [],
      declarations: [WelcomeComponent],
      imports: [
        TranslateTestingModule.withTranslations({
          en: { welcome: 'Welcome to STARGAZER' },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(getTextContent(fixture, 'h1')).toContain('Welcome to STARGAZER');
  });
});
