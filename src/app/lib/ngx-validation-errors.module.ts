import {FOR_ROOT_OPTIONS_TOKEN, ValidationErrorsConfigObject} from './injection-tokens';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {InputErrorsComponent} from './input-errors.component';
import {FormFieldContainerComponent} from './form-field-container.component';
import {ValidationContextComponent} from './validation-context.component';
import {VALIDATION_ERROR_CONFIG, ValidationErrorsConfig} from './error-validation-config';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormArrayContainerComponent} from './form-array-container.component';
import {MapToMessagePipe} from './map-to-message.pipe';
import {InnerMapToMessagePipe} from './inner-map-to-message.pipe';
import {FormFieldEmptyContainerDirective} from './form-field-empty-container.directive';


export const defaultConfig = {
  defaultContext: 'GENERAL',
  errorComponent: InputErrorsComponent as any
} as ValidationErrorsConfig;

export function configFactory(customConfig: ValidationErrorsConfig, currentConfig: ValidationErrorsConfig) {
  const actualConfig = {...currentConfig};
  if (customConfig) {
    if (customConfig.defaultContext) {
      actualConfig.defaultContext = customConfig.defaultContext;
    }

    if (customConfig.errorComponent) {
      actualConfig.errorComponent = customConfig.errorComponent;
    }
  }
  return actualConfig;
}

@NgModule({
    declarations: [
        InputErrorsComponent,
        FormFieldContainerComponent,
        FormFieldEmptyContainerDirective,
        FormArrayContainerComponent,
        ValidationContextComponent,
        MapToMessagePipe,
        InnerMapToMessagePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InputErrorsComponent,
        FormFieldContainerComponent,
        FormArrayContainerComponent,
        ValidationContextComponent,
        FormFieldEmptyContainerDirective
    ]
})
export class NgxValidationErrorsModule {

  static forRoot(config?: ValidationErrorsConfig): ModuleWithProviders<NgxValidationErrorsModule> {
    return {
      ngModule: NgxValidationErrorsModule,
      providers: [
        {
          provide: ValidationErrorsConfigObject, useValue: defaultConfig as ValidationErrorsConfig
        },
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: config
        },
        MapToMessagePipe,
        {
          provide: VALIDATION_ERROR_CONFIG,
          useFactory: configFactory,
          deps: [FOR_ROOT_OPTIONS_TOKEN, ValidationErrorsConfigObject]
        },
        MapToMessagePipe,
        InnerMapToMessagePipe
      ]
    };
  }
}

