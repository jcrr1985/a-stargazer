import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { ResourceLightBase } from '@models/resource-light-base.model';
import { ResourceLightDTO } from '@models/resource-light-dto.model';
import { ResourceWithProfileAndEventLightDTO } from '@models/resource-with-profile-and-event-light-dto.model';
import { TransmissionLightDTO } from '@models/transmission-light-dto.model';
import { ColumnConfiguration } from '@shared/components/add-remove-table/add-remove-table.component';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  AddOrganizationDialogComponent,
  OrganizationDialogData,
} from '../add-organization-dialog/add-organization-dialog.component';
import {
  AddResourceDialogComponent,
  ResourceDialogData,
} from '../add-resource-dialog/add-resource-dialog.component';
import { AddTransmissionDialogComponent } from '../add-transmission-dialog/add-transmission-dialog.component';

@Component({
  selector: 'app-incident-summary',
  templateUrl: './incident-summary.component.html',
  styleUrls: ['./incident-summary.component.scss'],
})
export class IncidentSummaryComponent implements OnInit, OnDestroy {
  @Input() formGroupName!: string;
  private _onDestroy$ = new Subject<void>();
  form!: FormGroup;
  transmissionNoColumns: ColumnConfiguration[] = [
    {
      accesor: 'no',
      headerTranslateKey: 'trxNo',
    },
    {
      accesor: 'title',
      headerTranslateKey: 'title',
    },
    {
      accesor: 'description',
      headerTranslateKey: 'txmDesc',
    },
    {
      accesor: 'eventNo',
      headerTranslateKey: 'eventNo',
    },
    {
      accesor: 'eventDesc',
      headerTranslateKey: 'eventDesc',
    },
  ];

  resourceCodeColumns: ColumnConfiguration[] = [
    {
      accesor: 'rscCode',
      headerTranslateKey: 'rscCode',
    },
    {
      accesor: 'title',
      headerTranslateKey: 'title',
    },
  ];

  organizationCodeColumns: ColumnConfiguration[] = [
    {
      accesor: 'orgCode',
      headerTranslateKey: 'orgCode',
    },
    {
      accesor: 'name',
      headerTranslateKey: 'name',
    },
  ];

  constructor(
    private readonly rootFormGroup: FormGroupDirective,
    private readonly dialog: MatDialog
  ) {}

  get selectedTransmissions() {
    return this.form
      .get('transmissions')!
      .value.map((tx: TransmissionLightDTO) => ({
        no: tx.no,
        title: tx.title,
        description: tx.description || '',
        eventNo: tx.event?.no || '',
        eventDesc: tx.event?.description || '',
      }));
  }

  set selectedTransmissions(newValue) {
    this.form.get('transmissions')!.patchValue(newValue);
  }

  get selectedResources() {
    return this.form
      .get('resources')!
      .value.map((resource: ResourceLightBase) => ({
        rscCode: resource.code,
        title: resource.name,
      }));
  }

  set selectedResources(newValue) {
    this.form.get('resources')!.setValue(newValue);
  }

  get selectedOrganizations() {
    return this.form
      .get('organizations')!
      .value.map((organization: OrganizationEmbeddedDTO) => ({
        orgCode: organization.code,
        name: organization.name,
      }));
  }

  get selectedTransmissionsIds() {
    return this.form
      .get('transmissions')!
      .value.map((tx: TransmissionLightDTO) => tx.id);
  }

  set selectedOrganizations(newValue) {
    this.form.get('organizations')!.setValue(newValue);
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  openAddTxDialog(): Promise<TransmissionLightDTO> {
    const confirmationDialogRef = this.dialog.open(
      AddTransmissionDialogComponent,
      {
        width: '800px',
      }
    );

    return confirmationDialogRef
      .afterClosed()
      .pipe(tap(() => takeUntil(this._onDestroy$)))
      .toPromise();
  }

  openAddResourceDialog(): Promise<
    (ResourceLightDTO | ResourceWithProfileAndEventLightDTO)[]
  > {
    const confirmationDialogRef = this.dialog.open(AddResourceDialogComponent, {
      width: '800px',
      data: {
        selectedTransmissionsIds: this.selectedTransmissionsIds,
        selectedResources: this.form.get('resources')!.value,
      } as ResourceDialogData,
    });

    return confirmationDialogRef
      .afterClosed()
      .pipe(tap(() => takeUntil(this._onDestroy$)))
      .toPromise();
  }

  openAddOrganizationDialog(): Promise<OrganizationEmbeddedDTO[]> {
    const confirmationDialogRef = this.dialog.open(
      AddOrganizationDialogComponent,
      {
        width: '800px',
        data: {
          selectedTransmissionsIds: this.selectedTransmissionsIds,
          selectedOrganizations: this.form.get('organizations')!.value,
        } as OrganizationDialogData,
      }
    );

    return confirmationDialogRef
      .afterClosed()
      .pipe(tap(() => takeUntil(this._onDestroy$)))
      .toPromise();
  }

  async addTransmissionNo() {
    const selectedTX = await this.openAddTxDialog();
    if (selectedTX) {
      this.selectedTransmissions = [
        ...this.form.get('transmissions')!.value,
        selectedTX,
      ];
    }
  }

  removeTransmissionNo() {
    this.selectedTransmissions = this.form
      .get('transmissions')!
      .value.slice(0, this.form.get('transmissions')!.value.length - 1);
  }

  async addResourceCode() {
    const selectedResourceCodes = await this.openAddResourceDialog();
    if (selectedResourceCodes && selectedResourceCodes.length > 0) {
      this.selectedResources = selectedResourceCodes;
    }
  }

  removeResourceCode() {
    this.selectedResources = this.form
      .get('resources')!
      .value.slice(0, this.form.get('resources')!.value.length - 1);
  }

  async addOrganizationCode() {
    const selectedOrganizationCodes = await this.openAddOrganizationDialog();
    if (selectedOrganizationCodes && selectedOrganizationCodes.length > 0) {
      this.selectedOrganizations = selectedOrganizationCodes;
    }
  }

  removeOrganizationCode() {
    this.selectedOrganizations = this.form
      .get('organizations')!
      .value.slice(0, this.form.get('organizations')!.value.length - 1);
  }
}
