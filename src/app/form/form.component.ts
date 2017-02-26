import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import '@ngrx/core/add/operator/select';

import * as fromRoot from '../app.reducers';
import * as rest from '../rest/rest.actions';
import {FormCreationService} from "./form-creation.service";
import {Path, Property} from "../schema/schema.models";
import {Observable} from 'rxjs/Rx';
import {Store} from "@ngrx/store";


@Component({
  selector: 'form-component',
  template: `
{{form$ | async | json}}
<div class="ui-g">
  <form [formGroup]="form$ | async" (ngSubmit)="onSubmit.emit(form.value)">
    <div class="ui-g-12" *ngFor="let pathPropertyName of selectedPathPostBodyPropertyNames | async">
      <dynamic-form-element [formElementName]="pathPropertyName" [form]="form"></dynamic-form-element>
    </div>
    <div class="ui-g-12">
      <button type="submit" label="{{selectedPathName | async}}" pButton ></button>
    </div>
  </form>
</div>
`
})
export class FormComponent implements OnChanges {
  public form$: Observable<FormGroup>;
  public selectedPathPostBodyPropertyNames$: Observable<string[]>;

  selectedPathName$: Observable<string>;
  selectedPathPostBodyProperties$: Observable<{[name: string]: Property[]; }>;
  selectedPathPostBodyRequiredPropertyNames$: Observable<string[]>;

  constructor(private form_creation: FormCreationService,
              private store: Store<fromRoot.State>) {
    this.selectedPathName$ = store.select(fromRoot.getSelectedPathName);
    this.selectedPathPostBodyProperties$ = store.select(fromRoot.getSelectedPathPostBodyProperties);
    this.selectedPathPostBodyRequiredPropertyNames$ = store.select(fromRoot.getSelectedPathPostBodyRequiredPropertyNames);
  }

  ngOnChanges() {
    this.selectedPathPostBodyPropertyNames$ = this.selectedPathPostBodyProperties$.map(selectedPathPostBodyProperties => Object.keys(selectedPathPostBodyProperties));
    // this.form$ = this.store.take(1).switchMap(state =>
    //
    //   .selectedPathPostBodyProperties$.flatMap(selectedPathPostBodyProperties => this.selectedPathPostBodyRequiredPropertyNames$) .flatMap this.form_creation.toFormGroup(this.selectedPathPostBodyProperties,
    //                                            this.selectedPathPostBodyRequiredPropertyNames);
    this.form$ = Observable.combineLatest(this.store.select(fromRoot.getSelectedPathPostBodyProperties),
      this.store.select(fromRoot.getSelectedPathPostBodyRequiredPropertyNames), (selectedPathPostBodyProperties, selectedPathPostBodyRequiredPropertyNames) => {
        return this.form_creation.toFormGroup(selectedPathPostBodyProperties, selectedPathPostBodyRequiredPropertyNames);
      })
  }


  public onSubmit(formValue: any) {
    this.store.dispatch(new rest.SubmitFormAction(formValue));
  }

}
