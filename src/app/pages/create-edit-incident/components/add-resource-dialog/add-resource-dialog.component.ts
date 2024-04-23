import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ResourceLightDTO } from '@models/resource-light-dto.model';
import { ResourceWithProfileAndEventLightDTO } from '@models/resource-with-profile-and-event-light-dto.model';
import { ResourcesService } from '@services/resources/resources.service';
import { Subject, of } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

export interface ResourceDialogData {
  selectedTransmissionsIds: number[];
  selectedResources: (ResourceLightDTO | ResourceWithProfileAndEventLightDTO)[];
}
@Component({
  selector: 'app-add-resource-dialog',
  templateUrl: './add-resource-dialog.component.html',
  styleUrls: ['./add-resource-dialog.component.scss'],
})
export class AddResourceDialogComponent implements OnInit, OnDestroy {
  @ViewChild('suggestedResourcesList')
  suggestedResourcesList!: MatSelectionList;

  private _onDestroy$ = new Subject<void>();

  autocompleteControl = new FormControl();

  suggestedResources: (
    | ResourceLightDTO
    | ResourceWithProfileAndEventLightDTO
  )[] = [];

  selectedResources: (
    | ResourceLightDTO
    | ResourceWithProfileAndEventLightDTO
  )[] = [];

  loadingSuggestions = false;
  suggestionLoadError = false;

  constructor(
    public dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA) public data: ResourceDialogData,
    private readonly resourcesService: ResourcesService
  ) {}

  ngOnInit(): void {
    if (this.data.selectedTransmissionsIds.length > 0) {
      this.resourcesService
        .getResourcesByTransmissionIdList(this.data.selectedTransmissionsIds)
        .pipe(
          tap(() => {
            this.loadingSuggestions = true;
            this.suggestionLoadError = false;
            this.suggestedResources = [];
          }),
          takeUntil(this._onDestroy$),
          catchError(() => {
            this.loadingSuggestions = false;
            this.suggestionLoadError = true;

            return of([] as ResourceWithProfileAndEventLightDTO[]);
          })
        )
        .subscribe((resourceList) => {
          this.loadingSuggestions = false;
          this.suggestedResources = [...resourceList];
          if (
            this.data.selectedResources &&
            this.data.selectedResources.length > 0
          ) {
            const manuallyAddedTransmissions =
              this.data.selectedResources.filter(
                (elem) =>
                  !resourceList.map((resource) => resource.id).includes(elem.id)
              );
            this.suggestedResources = [
              ...manuallyAddedTransmissions,
              ...resourceList,
            ];
          }

          this.selectedResources = this.data.selectedResources || [];
        });
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  getFilteredResources = (query: string) =>
    this.resourcesService.getFilteredResources(query);

  getResourceDisplayValue(option: ResourceLightDTO) {
    if (!option) {
      return '';
    }

    let displayValue = option.code;

    if (option.name) {
      displayValue += ` - ${option.name}`;
    }

    return displayValue;
  }

  setOptionSelected(option: ResourceLightDTO) {
    this.suggestedResources = [option, ...this.suggestedResources];
    this.selectedResources = [option, ...this.selectedResources];
  }

  onSuggestionSelectionChange() {
    this.selectedResources =
      this.suggestedResourcesList.selectedOptions.selected.map(
        (res) => res.value
      );
  }

  isResourceSelected(
    resource: ResourceLightDTO | ResourceWithProfileAndEventLightDTO
  ): boolean {
    return this.selectedResources.map((res) => res.id).includes(resource.id);
  }
}
