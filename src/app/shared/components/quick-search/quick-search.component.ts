import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuickSearchEntity } from '@models/models';
import { SearchService } from '@services/quick-search/quick-search.service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs/operators';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss'],
})
export class QuickSearchComponent implements OnInit, OnDestroy {
  subjectInput = new Subject<string>();
  quickSearchResults: any[] = [];
  searchControl = new FormControl();

  destroy$: Subject<void> = new Subject<void>();
  showResults: boolean = false;
  selectedOption: string = '';

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap(() => {
          this.quickSearchResults = [];
        }),
        filter((query) => query.length >= 0),
        debounceTime(300),
        throttleTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          return this.searchService.search(query);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.quickSearchResults = results;
        this.showResults = results.length > 0;
      });
  }

  onQuickSearchClear(): void {
    this.searchControl.setValue('');
    this.quickSearchResults = [];
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showResults = false;
  }

  formatResult(result: QuickSearchEntity): string {
    let formattedResult = '';
    if (!result) {
      return formattedResult;
    }
    if (result.type) {
      formattedResult += result.type + ' ';
    }
    if (result.code) {
      formattedResult += result.code;
    }
    if (result.name) {
      formattedResult += ' - ' + result.name;
    }

    return formattedResult;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
