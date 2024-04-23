import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SelectionModel } from '../../cdk/collections/selection-model';
import { AutocompleteConfiguration } from '../../models/models';
import { errorControlMessage } from '../../utils/errors/error-control';
import { hasRequiredValidator } from '../../utils/validators/has-validator';

@Component({
  selector: 'talan-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent<T> implements OnInit, OnDestroy {
  private _field!: AutocompleteConfiguration;

  get field(): AutocompleteConfiguration {
    return this._field;
  }

  @Input() set field(value: AutocompleteConfiguration) {
    this._field = value;
  }

  @Input() control!: FormControl;

  get required() {
    return hasRequiredValidator(this.control);
  }

  constructor() {}

  errorControlMessage = errorControlMessage;

  displayWith(value: any) {
    return this.field.displayWith
      ? this.field.displayWith(value)
      : (value as string);
  }

  get showMoreMessageItems() {
    return this.field.showMoreMessageItems || 2;
  }

  onTooltip() {
    return this.optionsSelected.selected
      .map((option) => this.displayWith(option))
      .join(', ');
  }

  //
  filteredOptions: T[] = [];

  loading = false;

  error = false;

  private _onDestroy$ = new Subject<void>();

  inputControl = new FormControl('');
  ngOnInit(): void {
    this.inputControl.valueChanges
      .pipe(
        startWith(this.field.startWith || ''),
        debounceTime(this.field.debounceTime || 300),
        distinctUntilChanged(),
        filter((value) => value.length > (this.field.minlength || -1)),
        tap(() => {
          this.loading = true;
          this.error = false;
          this.filteredOptions = [];
        }),
        switchMap((val) => {
          return this.field.apiMethod(val);
        }),
        catchError((_error) => {
          this.loading = false;
          this.error = true;
          return of([]);
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((data: T[]) => {
        this.filteredOptions = data;
        this.loading = false;
      });

    this.optionsSelected = new SelectionModel<T>(
      this.field.multiple,
      [],
      true,
      (o1: T, o2: T) => this.displayWith(o1) === this.displayWith(o2)
    );

    this.optionsSelected.changed.subscribe((_currentValue) => {
      if (this.field.multiple) {
        this.control.setValue(this.optionsSelected.selected);
      } else {
        this.control.setValue(this.optionsSelected.selected[0]);
      }
    });
  }

  inputValue = '';
  keyup(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  @ViewChild('input', { read: MatAutocompleteTrigger })
  matAutocomplete!: MatAutocompleteTrigger;

  optionsSelected!: SelectionModel<T>;

  onOptionSelected(option: MatAutocompleteSelectedEvent) {
    this.optionsSelected.toggle(option.option.value);

    this.inputControl.setValue(this.inputValue);

    setTimeout(() => {
      this.matAutocomplete.openPanel();
    }, 0);
  }

  isSelected(value: T) {
    return this.optionsSelected.isSelected(value);
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
