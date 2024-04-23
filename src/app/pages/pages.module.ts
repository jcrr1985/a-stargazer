import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../material.module';
import { AddOrganizationDialogComponent } from './create-edit-incident/components/add-organization-dialog/add-organization-dialog.component';
import { AddResourceDialogComponent } from './create-edit-incident/components/add-resource-dialog/add-resource-dialog.component';
import { AddTransmissionDialogComponent } from './create-edit-incident/components/add-transmission-dialog/add-transmission-dialog.component';
import { IncidentAttachmentsComponent } from './create-edit-incident/components/incident-attachments/incident-attachments.component';
import { IncidentSummaryComponent } from './create-edit-incident/components/incident-summary/incident-summary.component';
import { IncidentUpdateHistoryComponent } from './create-edit-incident/components/incident-update-history/incident-update-history.component';
import { CreateEditIncidentComponent } from './create-edit-incident/create-edit-incident.component';
import { DomainMappingsComponent } from './domain-manager/components/domain-mappings/domain-mappings.component';
import { DomainParameterDialogComponent } from './domain-manager/components/domain-parameter-dialog/domain-parameter-dialog.component';
import { DomainParameterItemDialogComponent } from './domain-manager/components/domain-parameter-item-dialog/domain-parameter-item-dialog.component';
import { DomainParametersComponent } from './domain-manager/components/domain-parameters/domain-parameters.component';
import { DomainManagerComponent } from './domain-manager/domain-manager.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormComponent } from './search-event/form/form.component';
import { SearchEventComponent } from './search-event/search-event.component';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DiscountManagerComponent } from './domain-manager/components/discount-manager/discount-manager.component';

@NgModule({
  declarations: [
    AddTransmissionDialogComponent,
    CreateEditIncidentComponent,
    FormComponent,
    IncidentAttachmentsComponent,
    IncidentSummaryComponent,
    IncidentUpdateHistoryComponent,
    NotFoundComponent,
    PagesComponent,
    SearchEventComponent,
    SearchOrganizationComponent,
    WelcomeComponent,
    AddResourceDialogComponent,
    AddOrganizationDialogComponent,
    DomainManagerComponent,
    DomainParametersComponent,
    DomainMappingsComponent,
    DomainParameterDialogComponent,
    DomainParameterItemDialogComponent,
    DiscountManagerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PagesModule {}
