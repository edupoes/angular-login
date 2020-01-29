import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, Vista1Component, Vista2Component, AuthGuard } from './';

const routes: Routes =
  [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
      path: 'login',
      component: LoginComponent // TODO - Guard que impida ir al login si estás logueado
    },
   // Parte privada controlada por el guard. Por defecto carga vista1
    {
      path: 'dashboard', component: Vista1Component, children: [
        {
          path: 'vista1',
          component: Vista1Component
        },
        // En un principio el acceso a la ruta no estará protegido. Cualquier usuario logueado puede acceder
        {
          path: 'vista2',
          component: Vista2Component
        }
      ],
      // Compruebo que el usuario esté autentificado
      canActivate: [AuthGuard]
    },
    // Rutas no reconocidas llevan al main, el guard se encargará de llevar al login si es preciso
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
