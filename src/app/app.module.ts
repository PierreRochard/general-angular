import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RestSchemaService, RestClient, APP_CONFIG, AuthenticationService} from "angular2-postgrest/dist";

import { AppComponent } from './app.component';
import {SchemaGuard} from "./guards/schema.guard";
import {routing} from "./app.routing";
import {HomeComponent} from "./pages/home/home.component";
import {AppConfig} from "./pages/app.config";
import {MenubarComponent} from "./menubar/menubar.component";
import {MenubarModule} from "primeng/components/menubar/menubar";
import {MenuService} from "./services/menu.service";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    MenubarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MenubarModule,
  ],
  providers: [
    SchemaGuard,
    AuthenticationService,
    RestSchemaService,
    RestClient,
    { provide: APP_CONFIG, useValue: AppConfig },
    MenuService,
  ]
})
export class AppModule { }
