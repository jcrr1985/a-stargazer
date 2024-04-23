import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DatetimeComponent } from './components/datetime/datetime.component';
import { EmptyComponent } from './components/empty/empty.component';
import { InputComponent } from './components/input/input.component';
import { RadioComponent } from './components/radio/radio.component';
import { SelectComponent } from './components/select/select.component';
import { SliderComponent } from './components/slider/slider.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { SetDateOnKeyPressDirective } from './directives/set-date-on-key-press.directive';
import { DynamicFormComponent } from './dynamic-form.component';
import { MaterialModule } from './material.module';
import { GetPipe } from './pipe/get/get.pipe';
import { SafeHtmlPipe } from './pipe/safe-html/safe-html.pipe';

@NgModule({
  declarations: [
    DynamicFormComponent,
    AutocompleteComponent,
    CheckboxComponent,
    DatetimeComponent,
    EmptyComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    SliderComponent,
    TextareaComponent,
    ToggleComponent,
    GetPipe,
    SafeHtmlPipe,
    DynamicComponentDirective,
    SetDateOnKeyPressDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, TranslateModule],
  exports: [DynamicFormComponent, SetDateOnKeyPressDirective],
})
export class DynamicFormModule {}
