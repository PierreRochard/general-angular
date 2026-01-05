import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';

import { RestEffects } from './rest/rest.effects';

import { GrowlContainer } from './growl/growl.container';
import { GrowlComponent } from './growl/growl.component';

import { AppAuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/auth.effects';

import { AppFormModule } from './form/form.module';
import { FormEffects } from './form/form.effects';

import { AppTableModule } from './table/table.module';

import { HomeContainer } from './home/home.container';
import { TableEffects } from './table/table.effects';

import { RestClient } from './rest/rest.service';

import { reducers, metaReducers } from './app.reducers';
import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { WebsocketEffects } from './websocket/websocket.effects';
import { WebsocketService } from './websocket/websocket.service';
import { AppMenubarModule } from './menubar/menubar.module';
import { MenubarEffects } from './menubar/menubar.effects';
import { RouterEffects } from './router/router.effects';
import { CustomRouterStateSerializer } from './router/router.serializer';
import { MatCardModule } from '@angular/material/card';
import { AUTH_INTERCEPTOR_PROVIDER } from './auth/auth.interceptor';
import { REST_CONFIG } from './rest/rest.config';
import { environment } from '../environments/environment';
import { HttpErrorInterceptorProvider } from './rest/http-error.interceptor';

@NgModule({ bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeContainer,
        GrowlContainer,
        GrowlComponent,
    ], imports: [AppAuthModule,
        AppFormModule,
        AppMenubarModule,
        AppTableModule,
        BrowserModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot([AuthEffects, FormEffects, MenubarEffects, RestEffects,
            RouterEffects, TableEffects, WebsocketEffects]),
        MatCardModule,
        routing,
        StoreModule.forRoot(reducers, { metaReducers: metaReducers }),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' })], providers: [
        { provide: REST_CONFIG, useValue: environment.restConfig },
        AUTH_INTERCEPTOR_PROVIDER,
        HttpErrorInterceptorProvider,
        RestClient,
        WebsocketService,
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
}
