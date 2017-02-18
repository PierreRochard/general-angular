import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";

import {MenubarModule} from "primeng/components/menubar/menubar";
import {ButtonModule} from 'primeng/primeng';

import {RestSchemaService, RestClient, APP_CONFIG, AuthenticationService} from "angular2-postgrest";

import { AppComponent } from './app.component';
import {SchemaGuard} from "./guards/schema.guard";
import {routing} from "./app.routing";
import {HomeComponent} from "./pages/home.page";
import {AppConfig} from "./app.config";
import {MenubarComponent} from "./components/menubar.component";

import { reducer } from './reducers';
import {SchemaEffects} from "./effects/schema.effects";
import {RpcEndpointComponent} from "./pages/view-endpoint.page";
import {EndpointEffects} from "./effects/endpoint.effects";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    MenubarComponent,
    RpcEndpointComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MenubarModule,
    ButtonModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(SchemaEffects),
    EffectsModule.run(EndpointEffects),
  ],
  providers: [
    SchemaGuard,
    AuthenticationService,
    RestSchemaService,
    RestClient,
    { provide: APP_CONFIG, useValue: AppConfig },
  ]
})
export class AppModule { }
