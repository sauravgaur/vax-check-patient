// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
  // {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
  // {path: 'error', loadChildren: () => import('./views/pages/error/error.module').then(m => m.ErrorModule)},
  {
    path: '',
    component: BaseComponent,
    // canActivate: [AuthGuard],
    canActivate: [],
    children: [
      {
        path: 'payment',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'success',
        loadChildren: () => import('./views/pages/success/success.module').then(m => m.SuccessModule),
      },
      {
        path: 'failure',
        loadChildren: () => import('./views/pages/failure/failure.module').then(m => m.FailureModule),
      },
      {
          path: 'traveler',
          loadChildren: () => import('./views/pages/wizard/wizard.module').then(m => m.WizardModule),
        },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      // },
      // {
      //   path: 'mail',
      //   loadChildren: () => import('./views/pages/apps/mail/mail.module').then(m => m.MailModule),
      // },
      // {
      //   path: 'ecommerce',
      //   loadChildren: () => import('./views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
      // },
      // {
      //   path: 'ngbootstrap',
      //   loadChildren: () => import('./views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule),
      // },
      // {
      //   path: 'material',
      //   loadChildren: () => import('./views/pages/material/material.module').then(m => m.MaterialModule),
      // },
      // {
      //   path: 'wizard',
      //   loadChildren: () => import('./views/pages/wizard/wizard.module').then(m => m.WizardModule),
      // },
      // {
      //   path: 'builder',
      //   loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule),
      // },
      {path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: '**', redirectTo: 'traveler/registration', pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
