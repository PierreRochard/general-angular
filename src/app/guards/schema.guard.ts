import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs";

import { RestSchemaService } from "angular2-postgrest";
import {MenuService} from "../services/menu.service";

@Injectable()
export class SchemaGuard implements CanActivate {

  constructor( private schema_service: RestSchemaService,
               private menu_service: MenuService ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('paths') && localStorage.getItem('definitions')) {
      return Observable.of(true);
    }
    this.menu_service.upToDate = false;
    return this.schema_service.update();
  }
}
