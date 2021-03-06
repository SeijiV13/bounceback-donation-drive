import { AuthGuard } from './core/guards/auth.guard';
import { LoginModule } from './/modules/login/login.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full',
  },
  {
   path: 'login', pathMatch: 'full', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)

  },
  {
   path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
