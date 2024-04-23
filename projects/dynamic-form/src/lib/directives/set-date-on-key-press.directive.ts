import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * @ngModule DynamicFormModule
 *
 * @usageNotes
 *
 * Set a key press listener on 'T' press, that set the Date on the decorated form control.
 *
 * ```
 * <some-element talanSetDateOnKeyPress>...</some-element>
 * ```
 *
 * You can override the default and use a custom key. E.G.: On enter press
 *
 * ```
 * <some-element talanSetDateOnKeyPress="Enter">...</some-element>
 * ```
 *
 * @description
 *
 * An element directive that sets today's Date on the decorated form control.
 * By default, it will listen to 'T' press, but it could be configured to any
 * other key stroke.
 */
@Directive({
  selector: '[talanSetDateOnKeyPress]',
})
export class SetDateOnKeyPressDirective {
  /**
   * Key press to listen and set date.
   * @Default `T`
   */
  @Input('talanSetDateOnKeyPress') keyToListen: string = '';

  constructor(private control: NgControl) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === (this.keyToListen || 't')) {
      event.preventDefault();
      this.control.control?.setValue(new Date());
    }
  }
}
