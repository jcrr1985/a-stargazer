import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FieldConfiguration } from '../models/models';

@Directive({
  selector: '[talanDynamicComponent]',
})
export class DynamicComponentDirective implements OnChanges {
  /**
   * The component instance
   */
  @Input() component: any;

  /**
   * All inputs properties
   */
  @Input() inputs!: {
    field: FieldConfiguration;
    control: AbstractControl | undefined;
  };

  /**
   * DOM field order
   */
  @Input() index!: number;

  /**
   * The nativeElement to add classes, width...
   *
   * @HostBiding is not working because use ng-container with dynamic component
   */
  private get nativeElement(): HTMLElement {
    return (this.viewContainerRef.get(0) as any).rootNodes[0] as HTMLElement;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges(_changes: SimpleChanges): void {
    this.loadComponent();
  }

  /**
   * Creates `dynamic-form-${index}` & `dynamic-form-${field.type}` classes and add `field.classes` too
   */
  computeClasses(field: FieldConfiguration, index: number): string[] {
    let arr = [];

    if (field.classes instanceof Array) {
      arr = field.classes;
    } else {
      arr = field.classes?.split(' ') || [];
    }

    // Remove spaces
    arr = arr.map((item) => item.replace(/\s+/g, '')).filter(Boolean);

    return [...arr, `dynamic-form-${index}`, `dynamic-form-${field.type}`];
  }

  /**
   * Load component with inputs properties
   */
  loadComponent(): void {
    if (this.component) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(this.component);
      const componentRef: ComponentRef<any> = componentFactory.create(
        this.viewContainerRef.injector
      );

      // Asignar las propiedades de entrada al componente
      for (const key in this.inputs) {
        if (this.inputs.hasOwnProperty(key)) {
          componentRef.instance[key] = (this.inputs as any)[key];
        }
      }

      this.viewContainerRef.clear();
      this.viewContainerRef.insert(componentRef.hostView);

      this.addClass();
      this.addWidth();
      this.toggleHidden();
    }
  }

  addClass(): void {
    this.nativeElement.classList.add(
      ...this.computeClasses(this.inputs.field, this.index)
    );
  }

  addWidth(): void {
    this.setStyle(this.nativeElement, 'width', this.inputs.field.width);
  }

  toggleHidden(): void {
    if (this.inputs.field.hidden) {
      this.nativeElement.setAttribute('hidden', '');
    } else {
      this.nativeElement.removeAttribute('hidden');
    }
  }

  setStyle(el: HTMLElement, ruleName: string, value?: string): void {
    if (value) {
      el.style[ruleName as any] = value;
    }
  }
}
