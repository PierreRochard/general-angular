import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule} from '@ngrx/store-log-monitor';

import {FieldsetModule, GrowlModule} from 'primeng/primeng';

import {environment} from '../environments/environment';

import {RestEffects} from './rest/rest.effects';

import {GrowlContainer} from './growl/growl.container';
import {GrowlComponent} from './growl/growl.component';

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
import {MenubarEffects} from './menubar/menubar.effects';
import {RouterModule} from '@angular/router';
import {RouterEffects} from './router/router.effects';
const optionalImports = [];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeContainer,
    GrowlContainer,
    GrowlComponent,
  ],
  imports: [
    AppAuthModule,
    AppFormModule,
    AppMenubarModule,
    AppTableModule,
    BrowserModule,
    EffectsModule.forRoot([AuthEffects, FormEffects, MenubarEffects, RestEffects,
      RouterEffects, SchemaEffects, TableEffects, WebsocketEffects]),
    FieldsetModule,
    GrowlModule,
    HttpModule,
    routing,
    StoreModule.forRoot(reducer),
    RouterModule.forRoot([
      // some routes
    ]),
    StoreRouterConnectingModule,
    ...optionalImports,
  ],
  providers: [
    RestClient,
    WebsocketService,
  ]
})
export class AppModule { }
