# HttpError

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

- Include a global `HttpErrorInterceptor` in your project. It is automatically shown when an http request is made and hidden when the http request is finished.

## How to use

1. You need to add `HttpErrorModule` in the parent module

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...
    HttpErrorModule
  ],
  bootstrap: [AppComponent],
  providers: [],
```
