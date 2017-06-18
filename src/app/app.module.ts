import * as Raven from 'raven-js';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {HttpModule} from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule} from '@ngrx/store-log-monitor';

import {FieldsetModule, GrowlModule} from 'primeng/primeng';

import {environment} from '../environments/environment';

import {RestEffects} from './rest/rest.effects';

import {GrowlContainer} from './growl/growl.container';

import {AppAuthModule} from './auth/auth.module';
import {AuthEffects} from './auth/auth.effects';

import {AppFormModule} from './form/form.module';
import {FormEffects} from './form/form.effects';

import {AppTableModule} from './table/table.module';

import {HomeContainer} from './home/home.container';
import {TableEffects} from './table/table.effects';

import {RestClient} from './rest/rest.service';

import {SchemaEffects} from './schema/schema.effects';

import {reducer} from './app.reducers';
import {routing} from './app.routing';
import {AppComponent} from './app.component';

import {WebsocketEffects} from './websocket/websocket.effects';
import {WebsocketService} from './websocket/websocket.service';
import { AppMenubarModule } from './menubar/menubar.module';
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

if (!environment.production) {
  console.log('Dev Environment');
  optionalImports.push(StoreDevtoolsModule.instrumentOnlyWithExtension({
    maxAge: 5
  }));
  optionalImports.push(StoreLogMonitorModule);
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeContainer,
    GrowlContainer,
  ],
  imports: [
    AppAuthModule,
    AppFormModule,
    AppMenubarModule,
    AppTableModule,
    BrowserModule,
    EffectsModule.run(AuthEffects),
    EffectsModule.run(FormEffects),
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
    WebsocketService,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ]
})
export class AppModule { }
