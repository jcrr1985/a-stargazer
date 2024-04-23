import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { EmptyComponent } from './empty.component';

describe('EmptyComponent', () => {
  let component: EmptyComponent;
  let fixture: ComponentFixture<EmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyComponent, DynamicComponentDirective],
      imports: [ReactiveFormsModule, MatInputModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyComponent);
    component = fixture.componentInstance;
    component.field = { type: 'empty' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set and get the field property', () => {
    expect(component.field).toEqual({ type: 'empty' });
  });

  it('should render the component with correct styles', () => {
    const componentElement = fixture.debugElement.nativeElement;
    expect(componentElement).toBeTruthy();
    const styles = getComputedStyle(componentElement);
    expect(styles.display).toBe('inline-flex');
    expect(styles.padding).toBe('0px');
  });

  it('should have the correct display style', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const computedStyle = getComputedStyle(hostElement);
    expect(computedStyle.display).toBe('inline-flex');
  });

  it('should not have any child nodes', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.childNodes.length).toBe(0);
  });
});
