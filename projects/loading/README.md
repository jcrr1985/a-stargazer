# Loading

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

- Include a global `loading` in your project with `HttpInterceptor`. It is automatically shown when an http request is made and hidden when the http request is finished.

## How to use

1. You need to add `LoadingModule` in the parent module

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...
    // You can use `forRoot` implemantation or `provider` implementation
    LoadingModule.forRoot({
      excludeUrls: ['/events/search', '/countries/search'], // List of exclude urls to prevent loading component. Default is []
      skipLoadingHeaderName: ''X-Skip-Loading', // Name for request.headers to prevent loading component. Default is ''X-Skip-Loading'
    })
  ],
  bootstrap: [AppComponent],
  // You can use `forRoot` implemantation or `provider` implementation
  providers: [
    {
      provide: LOADING_CONFIGURATION,
      useValue: {
        loadingComponent: LoadingComponent,  // Loading component. Default is `LoadingComponent`
        excludeUrls: ['countries/search'],  // List of exclude urls to prevent loading component. Default is []
        'X-Skip-LoadingHeaderName: 'loading-header-skip', // Name for request.headers to prevent loading component. Default is ''X-Skip-Loading'
      },
    },
  ],
```

2. Use in ts file (wherever you want)

```ts
// any.service.ts or any.component.ts
constructor(
    public loadingService: LoadingService,
    private apiSerive: ApiService
  ) {}

  loadDataNoLoading() {
    /**
     * false - Prevent HTTP Request automatically loading (`LoadingInterceptor`)
     * From now on `loading` it will not be shown because `useInterceptor` is `false`
     *
     * _Note: You can use 'excludeUrls' or request.headers ''X-Skip-LoadingHeaderName' configuration to prevent loading component_
     */
    this.loadingService.useInterceptor = false;

    this.apiSerive.read('/character').subscribe((response) => {
      console.log(response);
    });
  }

    loadDataLoading() {
    /**
     * true - Allow HTTP Request automatically loading (`LoadingInterceptor`)
     * From now on `loading` it will be shown because `useInterceptor` is `true`
     */
    this.loadingService.useInterceptor = true;

    this.apiSerive.read('/character').subscribe((response) => {
      console.log(response);
    });
  }

  show() {
    this.loadingService.show();
  }

  hide() {
    this.loadingService.hide();
  }

  ngOnDestroy() {
    // Do not forget to re-enable global `loading`
    this.loadingService.useInterceptor = true;
  }
```
