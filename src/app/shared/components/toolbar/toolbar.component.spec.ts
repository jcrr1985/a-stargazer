import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '@services/quick-search/quick-search.service';
import { TabsService } from '@services/tabs/tabs.service';
import { ClockComponent } from '@shared/components/clock/clock.component';
import { MenuComponent } from '@shared/components/menu/menu.component';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { selectElement } from '@testing/dom-testing-utils';
import { fakeRouter } from '@testing/fake-router';
import { LoggerConfig, NGXLogger } from 'ngx-logger';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { QuickSearchComponent } from '../quick-search/quick-search.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        ClockComponent,
        MenuComponent,
        QuickSearchComponent,
      ],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatMenuModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        FormsModule,
        MatDialogModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({
          en: {
            quickSearch: 'Quick Search',
          },
        }),
        HttpClientTestingModule,
      ],
      providers: [
        SearchService,
        TabsService,
        LoggerConfig,
        { provide: Router, useValue: fakeRouter },
        { provide: LoggerConfig, useValue: LoggerConfig },
        NGXLogger,
        DatePipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a basic toolbar', () => {
    const gearMenu = selectElement(fixture, '#gears-menu');
    const toolsMenu = selectElement(fixture, '#tools-menu');
    const clocks = selectElement(fixture, '.clocks');
    const searchMenu = selectElement(fixture, '#search-menu');
    const addMenu = selectElement(fixture, '#add-menu');

    expect(component).toBeTruthy();
    expect(gearMenu).toBeTruthy();
    expect(toolsMenu).toBeTruthy();
    expect(clocks).toBeTruthy();
    expect(clocks.childNodes.length).toEqual(3);
    expect(searchMenu).toBeTruthy();
    expect(addMenu).toBeTruthy();
  });
});
