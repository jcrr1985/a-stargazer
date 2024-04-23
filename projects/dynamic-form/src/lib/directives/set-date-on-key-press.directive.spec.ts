import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetDateOnKeyPressDirective } from './set-date-on-key-press.directive';

@Component({
  template: `<input
    type="text"
    [formControl]="fakeInput"
    talanSetDateOnKeyPress />`,
})
class TestComponent {
  fakeInput = new FormControl();
}

describe('SetDateOnKeyPressDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let component: TestComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TestComponent, SetDateOnKeyPressDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 0, 1, 23, 59));
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('input');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should update the input value to the current date on keypress "t"', () => {
    const event = new KeyboardEvent('keypress', { key: 't' });
    const expectedDate = new Date();

    inputElement.dispatchEvent(event);
    expect(inputElement.value).toEqual(expectedDate.toString());
    expect(component.fakeInput.value).toEqual(expectedDate);
  });

  it('should not update the input value on keypress "a"', () => {
    const event = new KeyboardEvent('keypress', { key: 'a' });
    const expectedDate = new Date();

    inputElement.dispatchEvent(event);

    expect(inputElement.value).not.toEqual(expectedDate.toString());
  });
});
