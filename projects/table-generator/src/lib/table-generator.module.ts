import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
import { TableGeneratorComponent } from './table-generator.component';

@NgModule({
  declarations: [TableGeneratorComponent],
  imports: [CommonModule, FormsModule, TranslateModule, MaterialModule],
  exports: [TableGeneratorComponent],
})
export class TableGeneratorModule {}
