# DynamicForm

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## How to use (example)

1. Add next code to styles.scss (this is the default palette, you could use another one)

```scss
@import '@angular/material/theming';
@include mat-core();

// Default palette
$primary: mat-palette($mat-indigo);
$accent: mat-palette($mat-pink, A200, A100, A400);
$my-warn: mat-palette($mat-red);

$theme: mat-light-theme(
  (
    color: (
      primary: $primary,
      accent: $accent,
    ),
  )
);

@import '@mat-datetimepicker/core/datetimepicker/datetimepicker-theme';
@include mat-datetimepicker-theme($theme);
```

2. You need to add `DynamicFormModule` in the parent module

```ts
// https://v11.material.angular.io/components/form-field/api#MatFormFieldDefaultOptions
const matFormFieldOptions: MatFormFieldDefaultOptions = {
  appearance: 'outline', // 'fill' | 'outline' for angular >= 12
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...
    DynamicFormModule
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: matFormFieldOptions,
  }]
```

3. Use in your parent `html` component

```html
<talan-dynamic-form
  [fields]="fields"
  [updateOn]="'change'"
  [validators]="validators"
  [preventEnterSubmit]="false"
  (changes)="formChanges($event)"
  (submit)="formSubmit($event)"
  (enter)="formEnter($event)">
</talan-dynamic-form>
```

4. Use in your parent `ts` component

```ts
constructor() {}

validators = myCustomParentFormGroupValidator;

fields: FieldConfiguration[] = [
    {
      type: 'checkbox',
      // Control configuration
      name: 'my-checkbox-control',
      value: true,
      disabled: false,
      validators: Validators.requiredTrue,
      updateOn: 'change',
      // Material Configuration
      labelPosition: 'before',
      label: 'my-checkbox', // Optional
      placeholder: 'my-checkbox', // Optional
      hintStart: 'my-checkbox-hint start', // Optional
      hintEnd: 'my-checkbox-hint end', // Optional
      // Library configuration
      noFormField: false,
    },
];

checkbox = false;

form!: FormGroupDirective;

formChanges(form: FormGroupDirective) {
  console.log('changes', form);

  this.form = form;

  form.control.get('my-checkbox-control').valueChanges.subscribe((value) => {
    this.checkbox = value;
  })
}

formSubmit(form: FormGroupDirective) {
  console.log('submit', form);
}

formEnter(form: FormGroupDirective) {
  console.log('enter', form);
}

buttonSubmit() {
  // You can press 'Enter' key in the form or create a button submit
  this.form.ngSubmit.emit();
}

buttonReset() {
  // Reset form set all `controls` to `null`
  this.form.control.reset();
  // Reset only one `control` to `null`
  this.form.control.get('my-checkbox-control').reset();
}

buttonValidate() {
  // Pre-validate all `FormControl` before submit
  // this.form.control is the parent `FormGroup`
  this.form.control.markAllAsTouched();
}

// If you want to work directly with `DynamicFormComponent` use `@ViewChild` and `ngAfterViewInit`
@ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;
ngAfterViewInit(): void {
  console.log(this.dynamicForm);
}
```

## Properties

| Input              | Type                                                              | Mandatory | Default    | Description                     |
| ------------------ | ----------------------------------------------------------------- | :-------: | ---------- | ------------------------------- |
| fields             | [FieldConfiguration](../dynamic-form/src/lib/models/models.ts#10) |     Y     |            | Fields configuration            |
| updateOn           | `'change'\| 'blur' \| 'submit'`                                   |           | `'change'` | Parent `FormGroup` updateOn     |
| validators         | `ValidatorFn`                                                     |           |            | Parent `FormGroup` validators   |
| preventEnterSubmit | `boolean`                                                         |           | `false`    | Prevent submit with `Enter` key |

| Output  | Type               | Description                                                     |
| ------- | ------------------ | --------------------------------------------------------------- |
| changes | FormGroupDirective | When form is created or updated                                 |
| enter   | FormGroupDirective | form submit, if no `preventEnterSubmit` and validate DOM fields |
| submit  | FormGroupDirective | form submit, if form is valid else validate DOM fields          |

### Fields

You should create fields as `FieldConfiguration` (`autocomplete`, `checkbox`, `datetime`, `empty`, `input`, `radio`, `select`, `slider`, `textarea`, `toggle`), example:

```ts
fields: FieldConfiguration[] = [
  {
    type: 'select',
    name: 'my-select',
    label: 'my-select',
    multiple: true,
    options: ['a', 'b', 'c'],
    validators: [Validators.required, Validators.maxLength(2)],
    hintEnd: 'Max two items',
  },
  {
    type: 'input',
    name: 'my-input',
    label: 'my-input',
    validators: Validators.required,
  }
];
```

For more information you can visit the [models](../dynamic-form/src/lib/models/models.ts) file.
