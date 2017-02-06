import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {MenuService} from "../services/menu.service";


@Injectable()
export class MenuGuard implements CanActivate {

  constructor(private menu_service: MenuService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.menu_service.upToDate) {
      this.menu_service.update();
    }
    return true;
  }
}
