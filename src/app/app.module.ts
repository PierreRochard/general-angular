import * as Raven from 'raven-js';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {HttpModule} from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import {DataTableModule, FieldsetModule, GrowlModule} from 'primeng/primeng';

import { environment } from '../environments/environment';

import {RestEffects} from './rest/rest.effects';

import {GrowlContainer} from './growl/growl.container';


import {HomeContainer} from './home/home.container';
import {TableContainer} from './table/table.container';

import {TableDatatableComponent} from './table/table-datatable.component';

import {RestClient} from './rest/rest.service';

import {SchemaGuard} from './schema/schema.guard';
import {SchemaEffects} from './schema/schema.effects';

import {reducer} from './app.reducers';
import {routing} from './app.routing';
import {AppComponent} from './app.component';
import {AuthEffects} from './auth/auth.effects';
import {TableEffects} from './table/table.effects';

import {WebsocketEffects} from './websocket/websocket.effects';
import {WebsocketService} from './websocket/websocket.service';
import { AppMenubarModule } from './menubar/menubar.module';
import { AppFormModule } from './form/form.module';

const optionalImports = [];

Raven
  .config('https://5d41708e0aae4566ba49adf4d9be7bce@sentry.io/167393',
    {
      stacktrace: true,
      level: 'debug'
    })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    Raven.captureException(error.originalError);
  }
}

export function instrumentOptions() {
  return {
    monitor: useLogMonitor({ visible: true, position: 'right' })
  };
}

if (!environment.production) {
  // Note that you must instrument after importing StoreModule
  console.log('Dev Environment');
  optionalImports.push(StoreDevtoolsModule.instrumentStore(instrumentOptions));
  optionalImports.push(StoreLogMonitorModule);
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeContainer,
    GrowlContainer,
    TableContainer,
    TableDatatableComponent,
  ],
  imports: [
    AppFormModule,
    AppMenubarModule,
    BrowserModule,
    DataTableModule,
    EffectsModule.run(AuthEffects),
    EffectsModule.run(RestEffects),
    EffectsModule.run(SchemaEffects),
    EffectsModule.run(TableEffects),
    EffectsModule.run(WebsocketEffects),
    FieldsetModule,
    GrowlModule,
    HttpModule,
    RouterStoreModule.connectRouter(),
    routing,
    StoreModule.provideStore(reducer),
    ...optionalImports,
  ],
  providers: [
    RestClient,
    SchemaGuard,
    WebsocketService,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ]
})
export class AppModule { }
