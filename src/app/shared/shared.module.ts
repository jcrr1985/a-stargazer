import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormModule } from 'dynamic-form';
import { TableGeneratorModule } from 'table-generator';
import { MaterialModule } from '../material.module';
import { AddRemoveTableComponent } from './components/add-remove-table/add-remove-table.component';
import { AutocompleteAsyncComponent } from './components/autocomplete-async/autocomplete-async.component';
import { ClockComponent } from './components/clock/clock.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MenuComponent } from './components/menu/menu.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { TabbedContainerComponent } from './components/tabbed-container/tabbed-container.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TreeComponent } from './components/tree/tree.component';
import { ChangeRolesDialogComponent } from './components/change-roles-dialog/change-roles-dialog.component';
import { UserGroupDialogComponent } from './components/user-group-dialog/user-group-dialog.component';
import { DiscountManagerDialogComponent } from './components/discount-manager-dialog/discount-manager-dialog.component';

@NgModule({
  declarations: [
    AddRemoveTableComponent,
    ClockComponent,
    ConfirmationDialogComponent,
    AutocompleteAsyncComponent,
    MenuComponent,
    QuickSearchComponent,
    TabbedContainerComponent,
    ToolbarComponent,
    TreeComponent,
    ChangeRolesDialogComponent,
    UserGroupDialogComponent,
    DiscountManagerDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    TableGeneratorModule,
    DynamicFormModule,
  ],
  exports: [
    // Modules
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableGeneratorModule,
    DynamicFormModule,
    // Components
    AddRemoveTableComponent,
    ClockComponent,
    ConfirmationDialogComponent,
    ToolbarComponent,
    ClockComponent,
    TreeComponent,
    QuickSearchComponent,
    MenuComponent,
    TabbedContainerComponent,
    ToolbarComponent,
    TranslateModule,
    TreeComponent,
    AddRemoveTableComponent,
    AutocompleteAsyncComponent,
  ],
})
export class SharedModule {}
