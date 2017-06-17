import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Store} from '@ngrx/store';

import {AppState} from '../app.reducers';

import {ReceiveFormFieldSettingsAction} from './form.actions';
import {ReceivedResponseAction} from '../rest/rest.actions';
import {FormService} from './form.service';

@Injectable()
export class FormGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private formService: FormService,
  ) { }

  getFormFieldSettings(): Observable<boolean> {
    return this.formService.get_form_field_settings()
      .map(response => {
        return new ReceiveFormFieldSettingsAction(response.json())
      })
      .do((action: ReceiveFormFieldSettingsAction) => this.store.dispatch(action))
      .map(form => {
        return !!form;
      })
      .catch(error => {
        this.store.dispatch(new ReceivedResponseAction(error));
        return Observable.of(true);
      });
  }

  hasFormFieldSettingsInStore(form_name): Observable<boolean> {
    return this.store.select(state => state.form.formFieldSettings.filter(setting => setting.form_name === form_name))
      .map(formFieldSettings => {
        return formFieldSettings.length > 0;
      })
      .take(1);
  }

  hasFormFieldSettings(form_name): Observable<boolean> {
    return this.hasFormFieldSettingsInStore(form_name)
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.getFormFieldSettings();
      });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route);
    const form_name = route.url[1].path;
    const hasFormFieldSettings = this.hasFormFieldSettings(form_name);
    return hasFormFieldSettings;
  }
}
