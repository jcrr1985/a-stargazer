import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryIncidentDTO } from '@models/category-incident-dto.model';
import { IncidentOwnerDTO } from '@models/incident-owner-dto.model';
import { SaveIncidentRequestDTO } from '@models/save-incident-request-dto.model';
import { SubcategoryIncidentDTO } from '@models/subcategory-incident-dto.model';
import { TransmissionLightDTO } from '@models/transmission-light-dto.model';
import { IncidentsService } from '@services/incidents/incidents.service';
import { TabsService } from '@services/tabs/tabs.service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { dateToLocalDate } from '@shared/utils/helpers';
import { dateGreaterThan } from '@shared/validators/date-greater-than-validator';
import { intervalToDuration } from 'date-fns';
import { LoadingService } from 'loading';
import { Observable, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-incident',
  templateUrl: './create-edit-incident.component.html',
  styleUrls: ['./create-edit-incident.component.scss'],
})
export class CreateEditIncidentComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private _onDestroy$ = new Subject<void>();
  incidentForm!: FormGroup;
  formDefaultValue: any;
  isEditMode: boolean = false;
  isSaving: boolean = false;
  availableCategories: Observable<CategoryIncidentDTO[]>;
  availableSubcategories: SubcategoryIncidentDTO[] = [];
  availableOwners: Observable<IncidentOwnerDTO[]>;
  body: 'home' | 'notes' | 'attachment' | 'history' = 'home';

  constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly tabsService: TabsService,
    private readonly snackBar: MatSnackBar,
    private readonly incidentsService: IncidentsService,
    private readonly loadingService: LoadingService
  ) {
    this.availableCategories = this.incidentsService.getFilteredCategories('');
    this.availableOwners = this.incidentsService.getAllOwners();
    this.loadingService.useInterceptor = false;
  }

  ngOnInit(): void {
    this.incidentForm = this.formBuilder.group({
      incidentNo: new FormControl({ value: null, disabled: true }),
      status: new FormControl('OPEN', [Validators.required]),
      id: new FormControl(),
      version: new FormControl(0),
      entityTrackerIdBean: new FormControl(),
      timingStartDate: new FormControl(null, [Validators.required]),
      timingEndDate: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        dateGreaterThan('timingStartDate'),
      ]),
      duringTransmission: new FormControl(null, [Validators.required]),
      duration: new FormControl({ value: null, disabled: true }),
      isReviewed: new FormControl(false),
      isServiceRestablished: new FormControl(false),
      category: new FormControl(null, [Validators.required]),
      subcategory: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      owner: new FormControl(null, [Validators.required]),
      duringProgram: new FormControl(null, [Validators.required]),
      essaResponsible: new FormControl(),
      refeed: new FormControl(),
      region: new FormControl(),
      displayOnReport: new FormControl(false),
      serviceAffecting: new FormControl(null, [Validators.required]),
      subject: new FormControl(),
      summary: this.formBuilder.group({
        description: new FormControl(),
        informationToCaller: new FormControl(
          'Thank you. We are aware that this transmission is experiencing technical problems. Our team is working to restore the service as soon as possible. We apologise for any inconvenience caused.'
        ),
        action: new FormControl(),
        resolution: new FormControl(),
        transmissions: new FormControl([]),
        resources: new FormControl([]),
        organizations: new FormControl([]),
      }),
      notes: this.formBuilder.group({
        all: new FormControl([]),
        changed: new FormControl([]),
        removed: new FormControl([]),
      }),
      attachments: new FormControl([]),
      xrmManagedIncident: new FormControl(false),
      identifier: new FormControl(''),
    });
    this.formDefaultValue = this.incidentForm.value;
  }

  ngAfterViewInit(): void {
    const tabContext = this.tabsService.getActiveTabData().contextData;
    this.isEditMode = false;
    if (tabContext) {
      if (tabContext.incidentForm) {
        this.incidentForm.patchValue(tabContext.incidentForm);
      }

      if (tabContext.isEditMode) {
        this.isEditMode = tabContext.isEditMode;
      }
    }

    this.incidentForm.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.tabsService.setTabEditing(this.tabsService.activeTabId, true);
          if (this.incidentForm.value.timingStartDate) {
            this.incidentForm.controls.timingEndDate.enable();
          }
          this.updateDuration();
          this.tabsService.patchActiveTabContext({
            incidentForm: this.incidentForm.value,
          });
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();

    this.incidentForm.controls.category.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter((value) => value && value.id),
        switchMap((selectedCategory: CategoryIncidentDTO) =>
          this.incidentsService.getSubcategoriesByCategoryId(
            selectedCategory.id
          )
        ),
        takeUntil(this._onDestroy$)
      )
      .subscribe((subcategories) => {
        this.availableSubcategories = subcategories;
        this.incidentForm.controls.subcategory.enable();
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this.snackBar.dismiss();
    this.loadingService.useInterceptor = true;
  }

  openSaveDialog(): Promise<boolean> {
    const confirmationDialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '500px',
        data: {
          titleTranslateKey: 'incidentNotifiedENT',
          titleIcon: 'info',
        } as ConfirmationDialogData,
      }
    );

    return confirmationDialogRef
      .afterClosed()
      .pipe(tap(() => takeUntil(this._onDestroy$)))
      .toPromise();
  }

  getRequestDTOFromForm(): SaveIncidentRequestDTO {
    const formValue = this.incidentForm.value;
    return {
      id: formValue.id,
      version: formValue.version,
      entityTrackerIdBean: formValue.entityTrackerIdBean,
      no: formValue.incidentNo || null,
      description: formValue.summary.description,
      startDate: dateToLocalDate(formValue.timingStartDate),
      endDate: dateToLocalDate(formValue.timingEndDate),
      category: formValue.category,
      subCategory: formValue.subcategory,
      status: formValue.status,
      reviewed: formValue.isReviewed,
      region: formValue.region,
      responsible: formValue.essaResponsible,
      reFeed: formValue.refeed,
      serviceAffecting: formValue.serviceAffecting,
      transmissions: formValue.summary.transmissions.map(
        (tx: TransmissionLightDTO) => ({
          id: null,
          version: 0,
          entityTrackerIdBean: null,
          transmission: tx,
        })
      ),
      resources: formValue.summary.resources,
      organizations: formValue.summary.organizations,
      action: formValue.summary.action,
      owner: formValue.owner,
      informationToCaller: formValue.summary.informationToCaller,
      resolution: formValue.summary.resolution,
      notes: formValue.notes.all,
      noteChanges: {
        notesChanged: formValue.notes.changed,
        notesRemoved: formValue.notes.removed,
      },
      attachments: formValue.attachments,
      subject: formValue.subject,
      serviceReestablished: formValue.isServiceRestablished,
      duringTransmission: formValue.duringTransmission,
      duringProgram: formValue.duringProgram,
      displayOnReport: formValue.displayOnReport,
      identifier: formValue.identifier,
      defaultEntityType: 'INCIDENT',
      entityNameEnum: 'INCIDENT',
      entityType: 'INCIDENT',
      xrmManagedIncident: formValue.xrmManagedIncident,
      name: String(formValue.summary.description).slice(0, 25).concat('(...)'),
      code: formValue.incidentNo || null,
    };
  }

  async saveChanges() {
    if (this.incidentForm.valid) {
      const userConfirmed = await this.openSaveDialog();
      if (userConfirmed) {
        this.incidentsService
          .saveIncident(this.getRequestDTOFromForm())
          .pipe(
            tap(() => {
              this.snackBar.dismiss();
              this.isSaving = true;
            }),
            catchError(() => {
              this.snackBar.open('Failed to save', 'Close', {
                panelClass: ['neos-snackbar-error'],
              });
              return of({});
            })
          )
          .subscribe(() => {
            this.isSaving = false;
            this.snackBar.open('Saved successfully', 'Close', {
              panelClass: ['neos-snackbar-success'],
            });
            this.tabsService.setTabEditing(this.tabsService.activeTabId, false);
            // TODO: Show incident in edit mode after creation - Pending more info.
            // this.incidentForm.controls.incidentNo.setValue('01-1111-11');
            // // ----------------------------------
            // this.tabsService.patchActiveTabContext({
            //   incidentForm: this.incidentForm.value,
            // });
            // this.tabsService.getActiveTabData().label = '01-1111-11';
            // this.tabsService.setTabEditing(this.tabsService.activeTabId, false);
          });
      }
    }
  }

  closePage() {
    this.tabsService.removeTab(this.tabsService.activeTabId);
  }

  mergeTimingDateTime(selectedTime: Date, controlName: string) {
    const selectedTimingDate: Date = this.incidentForm.get(controlName)?.value;

    if (!selectedTimingDate) {
      this.incidentForm.get(controlName)?.setValue(selectedTime);

      return;
    }

    selectedTimingDate.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );
    this.incidentForm.updateValueAndValidity();
  }

  updateDuration() {
    const formValue = this.incidentForm.value;

    if (!formValue.timingStartDate || !formValue.timingEndDate) {
      this.incidentForm.controls.duration.setValue(null);
      return;
    }

    const duration = intervalToDuration({
      start: formValue.timingStartDate,
      end: formValue.timingEndDate,
    });

    let durationLabel = '';
    Object.entries(duration).forEach(([key, value]) => {
      if (value) {
        durationLabel += `${value}${key[0]} `;
      }
    });

    this.incidentForm.controls.duration.setValue(durationLabel);
  }
}
