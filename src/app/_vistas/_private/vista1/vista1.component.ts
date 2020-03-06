import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-vista1',
  template: `
    <p>
      Vista 1
    </p>

    <p *authIf="'odraude'">Soy odraude</p>
    <p *authIf="'eduardo'">Soy Eduardo</p>

  `,
  styles: []
})
export class Vista1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
