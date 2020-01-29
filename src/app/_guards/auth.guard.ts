import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthserviceService} from '../_servicios/authservice.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _auth : AuthserviceService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log('GUARD', state.url)

    // Compruebo si estoy logueado en el servicio de autentificación
      if (this._auth.logueado) {
      return true;
    }
    // Al loguin
      this._router.navigate(['/login']);
      return false;


  }

}
