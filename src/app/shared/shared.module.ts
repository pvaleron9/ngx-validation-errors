import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormSubmitDirective} from './form-submit.directive';
import { NgxValidationErrorsModule } from '../lib/ngx-validation-errors.module';

@NgModule({
  declarations: [
    FormSubmitDirective
  ],
  imports: [
    NgxValidationErrorsModule
  ],
  exports: [
    TranslateModule,
    NgxValidationErrorsModule,
    CommonModule,
    FormSubmitDirective
  ]
})
export class SharedModule {
}
