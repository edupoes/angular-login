import { Component } from '@angular/core';
import {AuthserviceService} from './_servicios/authservice.service';

@Component({
  selector: 'demo-root',
  template: `
    <nav class="navbar navbar-light bg-light justify-content-between shadow-sm">
      <span class="p-2">{{ title }}</span>
      <button class="btn btn-secondary w-auto mt-0 p-1" *ngIf="logueado" type="button" (click)="logOut()">LOGOUT</button>
    </nav>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  readonly title: string = 'DEMO';

  constructor(
    private _auth : AuthserviceService
  ) {
  }

  get logueado(): boolean {
    return this._auth.logueado;
  }
  public logOut(): void {
    this._auth.logOut();
  }

}

