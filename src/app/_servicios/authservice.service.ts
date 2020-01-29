import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from '../_interfaces/usuario';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private _logueado : boolean = false;
  private _usuario : Usuario;

  constructor(
    private _http: HttpClient,
    private _router : Router
  ) { }

  public get logueado(): boolean {
    return this._logueado;
  }
  public get usuario(): Usuario {
    return this._usuario;
  }

  public logIn(usuario: Usuario): void {
    this._logueado = true;
    this._usuario = usuario;
  }
  public logOut(): void {
    this._logueado = false;
    this._usuario = null;
    // Regreso al login
    this._router.navigate(['/login']);
  }

  /*
  Comprueba en el "servidor" si el usuario y pass introducidos son válidos
   */
  public checkLogin(usuario: Usuario): Observable<HttpResponse<boolean>> {
    return this._http.post<HttpResponse<boolean>>('http://localhost:4200/token', usuario);
  }
}
