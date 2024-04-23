import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
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

@Component({
  selector: 'app-autocomplete-async',
  templateUrl: './autocomplete-async.component.html',
  styleUrls: ['./autocomplete-async.component.scss'],
})
export class AutocompleteAsyncComponent implements OnInit, OnDestroy {
  @Input() labelTranslateKey?: string;
  @Input() displayValueFormatter!: (val: any) => string;
  @Input() searchMethod!: (inputValue: string) => Observable<any[]>;
  @Output() onSelectedOption = new EventEmitter<any>();

  filteredOptions: any[] = [];
  loading = false;
  error = false;
  private _onDestroy$ = new Subject<void>();

  autocompleteControl = new FormControl();

  ngOnInit(): void {
    this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => typeof value === 'string'),
        tap(() => {
          this.loading = true;
          this.error = false;
          this.filteredOptions = [];
        }),
        switchMap((val) => {
          return this.searchMethod(val);
        }),
        catchError((e) => {
          this.loading = false;
          this.error = true;
          return of([]);
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((transmissionsSearchResult) => {
        this.filteredOptions = transmissionsSearchResult;
        this.loading = false;
      });
  }

  optionSelectedHandler(selectedValue: any) {
    this.onSelectedOption.emit(selectedValue);
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
