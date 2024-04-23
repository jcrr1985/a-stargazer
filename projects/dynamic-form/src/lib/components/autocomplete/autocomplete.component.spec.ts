import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteAsyncComponent', () => {
  let component: AutocompleteComponent<any>;
  let fixture: ComponentFixture<AutocompleteComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AutocompleteComponent,
        DynamicComponentDirective,
        SafeHtmlPipe,
      ],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDividerModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot(),
        MatAutocompleteModule,
      ],
      providers: [TranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    (component.field = {
      type: 'autocomplete',
      name: 'name',
      apiMethod: (value: string) => of([{ name: 'Test1' }, { name: 'Test2' }]),
      displayWith: (value: any) => value.name,
    }),
      (component.control = new FormControl());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial configurations set', () => {
    expect(component.filteredOptions).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('should use the displayWith function', () => {
    const value = { name: 'Test' };
    const result = component.displayWith(value);
    expect(result).toBe('Test');
  });

  it('should fetch filtered options on input change', fakeAsync(() => {
    component.inputControl.setValue('Te');
    tick(400);
    fixture.detectChanges();
    expect(component.filteredOptions.length).toBe(2);
  }));

  it('should handle API errors', fakeAsync(() => {
    component.field.apiMethod = (value: string) => {
      throw new Error('API Error');
    };
    component.inputControl.setValue('Te');
    tick(400);
    fixture.detectChanges();
    expect(component.error).toBeTrue();
  }));

  it('should toggle on selection on optionSelected', () => {
    const option = { name: 'Test1' };
    const optionEvent = new MatAutocompleteSelectedEvent(
      {} as any,
      { value: option } as any
    );
    component.onOptionSelected(optionEvent);
    expect(component.optionsSelected.isSelected(option)).toBeTrue();
  });

  it('should toggle off selection on optionSelected', () => {
    const option = { name: 'Test1' };
    component.optionsSelected.select(option);
    const optionEvent = new MatAutocompleteSelectedEvent(
      {} as any,
      { value: option } as any
    );
    component.onOptionSelected(optionEvent);
    expect(component.optionsSelected.isSelected(option)).toBeFalse();
  });

  it('should call _onDestroy$.next() on destroy', () => {
    const spy = jasmine.createSpyObj('Subject', ['next']);
    component['_onDestroy$'] = spy as any;
    component.ngOnDestroy();
    expect(spy.next).toHaveBeenCalled();
  });

  it('should set array value if multiple is true', () => {
    component.field.multiple = true;
    const option = { name: 'Test1' };
    const optionEvent = new MatAutocompleteSelectedEvent(
      {} as any,
      { value: option } as any
    );
    component.onOptionSelected(optionEvent);
    expect(component.optionsSelected.selected).toEqual([option]);
  });

  it('should set single value if multiple is false or not defined', () => {
    component.field.multiple = false;
    const option = { name: 'Test1' };
    const optionEvent = new MatAutocompleteSelectedEvent(
      {} as any,
      { value: option } as any
    );
    component.onOptionSelected(optionEvent);
    expect(component.optionsSelected.selected).toEqual([option]);
  });

  it('should not call apiMethod if minlength is not reached', fakeAsync(() => {
    component.field.minlength = 3;
    spyOn(component.field, 'apiMethod');
    component.inputControl.setValue('Te');
    tick(400);
    expect(component.field.apiMethod).not.toHaveBeenCalled();
  }));

  it('should setup subscriptions on init', () => {
    const valueChangesSpy = spyOn(
      component.inputControl.valueChanges,
      'pipe'
    ).and.callThrough();
    component.ngOnInit();
    expect(valueChangesSpy).toHaveBeenCalled();
  });

  it('should cleanup subscriptions on destroy', () => {
    const unsubscribeSpy = spyOn(
      component['_onDestroy$'],
      'next'
    ).and.callThrough();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should update inputValue on keyup', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'Test';
    input.nativeElement.dispatchEvent(new Event('keyup'));
    expect(component.inputValue).toBe('Test');
  });

  it('should map and join selected options with displayWith function', () => {
    component.optionsSelected = { selected: ['a', 'b', 'c'] } as any;
    component.field = {
      displayWith: (value: any) => `${value}-modified`,
    } as any;
    expect(component.onTooltip()).toBe('a-modified, b-modified, c-modified');
  });

  it('should return modified value throught field.displayWith if is defined', () => {
    const mockValue = 'test';
    component.field = {
      displayWith: (value: any) => `${value}-modified`,
    } as any;
    expect(component.displayWith(mockValue)).toBe('test-modified');
  });

  it('should return original value as string if field.displayWith is not defined', () => {
    const mockValue = '123';
    component.field = {} as any;
    expect(component.displayWith(mockValue)).toBe('123');
  });

  it('should return field.showMoreMessageItems value if is defined', () => {
    component.field = {
      showMoreMessageItems: 5,
    } as any;
    expect(component.showMoreMessageItems).toBe(5);
  });

  it('should return 2 if field.showMoreMessageItems is not defined', () => {
    component.field = {} as any;
    expect(component.showMoreMessageItems).toBe(2);
  });
});
