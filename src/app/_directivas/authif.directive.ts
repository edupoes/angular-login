import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthserviceService} from '../_servicios/authservice.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[authIf]'
})
export class AuthifDirective {

  constructor(
    private _temRef: TemplateRef<any>,
    private _viCon: ViewContainerRef,
    private _auth : AuthserviceService
  ) {
  }

  @Input()
  set authIf(val) {
      const usuario: string = this._auth.usuario.nombre.toLowerCase();
      // Comparo el valor del Input con el nombre del usuario almacenado
      if (val.toLowerCase() === usuario) {
      this._viCon.createEmbeddedView(this._temRef);
    } else {
      this._viCon.clear();
    }
  }

}
