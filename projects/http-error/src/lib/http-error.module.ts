import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpErrorDialogComponent } from './dialog/http-error-dialog.component';
import { HttpErrorComponent } from './http-error.component';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [HttpErrorComponent, HttpErrorDialogComponent],
  imports: [BrowserModule, HttpClientModule, MaterialModule],
  exports: [HttpErrorComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class HttpErrorModule {}
