import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { getInnerText } from '@testing/dom-testing-utils';
import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;
  let element: HTMLElement;
  const fixedDate = new Date('2023-06-21T10:58:00Z');

  beforeAll(() => {
    spyOn(Date, 'now').and.returnValue(fixedDate.getTime());
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  it('should create default clock', fakeAsync(async () => {
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const clockText = getInnerText(fixture, 'span');

    expect(clockText).toEqual('10:58 UTC');
    discardPeriodicTasks();
  }));

  it('should be able to change label and timezone', fakeAsync(async () => {
    component.timeZoneLabel = 'GNVE';
    component.clockTimezone + '+2';

    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const clockText = getInnerText(fixture, 'span');

    expect(clockText).toEqual('10:58 GNVE');
    discardPeriodicTasks();
  }));

  it('should show date', fakeAsync(async () => {
    component.showDate = true;

    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const clockText = getInnerText(fixture, 'span');

    expect(clockText).toEqual('21/06/2023 10:58 UTC');
    discardPeriodicTasks();
  }));

  it('should show seconds', fakeAsync(async () => {
    component.showSeconds = true;

    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const clockText = getInnerText(fixture, 'span');

    expect(clockText).toEqual('10:58:00 UTC');
    discardPeriodicTasks();
  }));

  it('should show date and seconds', fakeAsync(async () => {
    component.showDate = true;
    component.showSeconds = true;

    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const clockText = getInnerText(fixture, 'span');

    expect(clockText).toEqual('21/06/2023 10:58:00 UTC');
    discardPeriodicTasks();
  }));
});
