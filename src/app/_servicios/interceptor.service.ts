import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Usuario} from '../_interfaces/usuario';
import {AuthserviceService} from './authservice.service';
/*
Lista de usuarios válidos. Lo normal es que sea el servidor quien haga la comprobación
Pongo los nombres ya en minúsculas para hacer un tolowercase
TODO - Encriptar las contraseñas
 */
const USUARIOS: Array<Usuario> = [
  { nombre: 'eduardo', pass: '1234' },
  { nombre: 'carlos', pass: '4321' }
];

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor  {

  constructor(
    private _auth : AuthserviceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercepto el falso POST a token aunque para la DEMO no haría falta comprobar el req.xxx
    if (req.method === 'POST' && req.url === 'http://localhost:4200/token') {
      const usuario: Usuario = req.body;
      const correcto: boolean = USUARIOS
        .findIndex( (user) => user.nombre === usuario.nombre.toLowerCase() && user.pass === usuario.pass.toLowerCase()) > -1;
      // Si existe en el array de usuarios una coincidencia en NOMBRE y PASS devuelve su índice
      if (correcto) {
        // Guardo el usuario y me logueo
        this._auth.logIn(req.body);
        return of(new HttpResponse({ status: 200 }));
      }
    }
    next
      .handle(req);
  }


}
