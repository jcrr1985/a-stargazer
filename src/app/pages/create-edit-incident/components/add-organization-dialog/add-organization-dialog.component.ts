import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { OrganizationsService } from '@services/organizations/organizations.service';
import { Subject, of } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

export interface OrganizationDialogData {
  selectedTransmissionsIds: number[];
  selectedOrganizations: OrganizationEmbeddedDTO[];
}

@Component({
  selector: 'app-add-organization-dialog',
  templateUrl: './add-organization-dialog.component.html',
  styleUrls: ['./add-organization-dialog.component.scss'],
})
export class AddOrganizationDialogComponent implements OnInit, OnDestroy {
  @ViewChild('suggestedOrganizationsList')
  suggestedOrganizationsList!: MatSelectionList;
  private _onDestroy$ = new Subject<void>();
  autocompleteControl = new FormControl();
  suggestedOrganizations: OrganizationEmbeddedDTO[] = [];
  selectedOrganizations: OrganizationEmbeddedDTO[] = [];

  loadingSuggestions = false;
  suggestionLoadError = false;

  constructor(
    public dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA) public data: OrganizationDialogData,
    private readonly organizationsService: OrganizationsService
  ) {}

  ngOnInit(): void {
    if (this.data.selectedTransmissionsIds.length > 0) {
      this.organizationsService
        .getOrganizationsByTransmissionIdList(
          this.data.selectedTransmissionsIds
        )
        .pipe(
          tap(() => {
            this.loadingSuggestions = true;
            this.suggestionLoadError = false;
            this.suggestedOrganizations = [];
          }),
          takeUntil(this._onDestroy$),
          catchError(() => {
            this.loadingSuggestions = false;
            this.suggestionLoadError = true;

            return of([] as OrganizationEmbeddedDTO[]);
          })
        )
        .subscribe((organizationList) => {
          this.loadingSuggestions = false;
          this.suggestedOrganizations = [...organizationList];

          if (
            this.data.selectedOrganizations &&
            this.data.selectedOrganizations.length > 0
          ) {
            const manuallyAddedTransmissions =
              this.data.selectedOrganizations.filter(
                (elem) =>
                  !organizationList.map((org) => org.id).includes(elem.id)
              );
            this.suggestedOrganizations = [
              ...manuallyAddedTransmissions,
              ...organizationList,
            ];
          }

          this.selectedOrganizations = this.data.selectedOrganizations || [];
        });
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  getFilteredOrganizations = (query: string) =>
    this.organizationsService.getFilteredOrganizations(query);

  getOrganizationDisplayValue(option: OrganizationEmbeddedDTO) {
    if (!option) {
      return '';
    }

    let displayValue = option.code;

    if (option.name) {
      displayValue += ` - ${option.name}`;
    }

    return displayValue;
  }

  setOptionSelected(option: OrganizationEmbeddedDTO) {
    this.suggestedOrganizations = [option, ...this.suggestedOrganizations];
    this.selectedOrganizations = [option, ...this.selectedOrganizations];
  }

  onSuggestionSelectionChange() {
    this.selectedOrganizations =
      this.suggestedOrganizationsList.selectedOptions.selected.map(
        (org) => org.value
      );
  }

  isOrganizationSelected(organization: OrganizationEmbeddedDTO): boolean {
    return this.selectedOrganizations
      .map((org) => org.id)
      .includes(organization.id);
  }
}
