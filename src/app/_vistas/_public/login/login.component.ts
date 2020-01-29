import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthserviceService} from '../../../_servicios/authservice.service';
import {Usuario} from '../../../_interfaces/usuario';
import {error} from 'util';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'demo-login',
  template: `
    <form [formGroup]="formulario" (ngSubmit)="checkLogin()" class="shadow p-3 bg-white rounded w-50 m-auto">
      <h5 class="mb-3">LOGIN</h5>
      <label for="nombre">Nombre</label>
      <input type="text" class="form-control" formControlName="nombre" autofocus>
      <label for="pass">Contraseña</label>
      <input type="password" class="form-control" formControlName="pass">
      <button [disabled]="formulario.invalid" class="btn btn-primary mt-4" type="submit">Entrar</button>
      <div *ngIf="errorLogin" class="alert alert-danger mt-4" role="alert">
        ¡Login incorrecto!
      </div>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  private _errorLogin: boolean = false;
  private _formulario: FormGroup;

  constructor(
    private _router: Router,
    private _build: FormBuilder,
    private _auth : AuthserviceService
  ) { }

  ngOnInit() {
    this._formulario = this._build
      .group({
        // Ya que estamos configuramos un minLength
        nombre: ['', [Validators.required, Validators.minLength(4)]],
        pass: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get errorLogin(): boolean {
    return this._errorLogin;
  }
  get formulario(): FormGroup {
    return this._formulario;
  }
  /*
    Devuelve el valor de un campo del formulario
    TODO - Controlar que el valor intermedio existe
   */
  private form(campo: string): string {
    return this._formulario.controls[`${campo}`].value;
  }
  /*
  Comprueba si el usuario y contraseña son válidos
   */
  checkLogin() {
    const user: Usuario = {nombre: this.form('nombre'), pass: this.form('pass')};
    this._auth.checkLogin(user)
      .subscribe(
        () => {
          // Login correcto, vamos a la parte privada
          this._router.navigate(['/main']);
        }, () => {
          // Login incorrecto, muestro mensaje de error
          this._errorLogin = true;
        });
  }

}
