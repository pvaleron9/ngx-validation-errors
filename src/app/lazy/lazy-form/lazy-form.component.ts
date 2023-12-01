import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import { ValidationContextComponent } from 'src/app/lib/validation-context.component';

function minCheckSelected(size: number) {
  return (control: AbstractControl) => {
    const values = control.value as (boolean | undefined)[];
    const selected = values.filter(v => !!v).length;
    if (selected < size) {
      return {checkBoxes: true};
    }
    return null;
  };
}

@Component({
  selector: 'app-lazy-form',
  templateUrl: './lazy-form.component.html',
  styleUrls: ['./lazy-form.component.css']
})
export class LazyFormComponent implements OnInit {

  @ViewChild('firstForm', {
    read: ValidationContextComponent,
    static: true
  }) validationContext: ValidationContextComponent;

  heroForm: FormGroup;

  boxesInfo = [
    'a',
    'b',
    'c',
    'd'
  ];

  constructor(private translateService: TranslateService) {
    this.heroForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      surname: new FormControl({value: null, disabled: true}, [Validators.required, Validators.maxLength(1000)]),
      checkBoxes: new FormArray(this.boxesInfo.map(a => new FormControl()), [minCheckSelected(1)])
    });

    this.heroForm.valueChanges.pipe(
      distinctUntilChanged(),
      tap(v => {
        console.debug('v', v);
        if (v.name) {
          this.heroForm.controls['surname'].enable({emitEvent: false});
        } else {
          this.heroForm.controls['surname'].disable({emitEvent: false});
        }
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  clearForm() {
    console.debug('this.validationContext', this.validationContext);
    this.validationContext.clear();

  }

  chooseLanguage(lan: string) {
    this.translateService.use(lan);
  }
}
