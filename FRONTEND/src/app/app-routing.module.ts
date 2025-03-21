import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  // {
  //   path: 'support',
  //   component: SupportComponent
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then((m) => m.EmployeeModule)
  },
  {
    path: 'admins',
    loadChildren: () => import('./admins/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'employers',
    loadChildren: () => import('./employers/employer.module').then((m) => m.EmployerModule)
  },
  {
    path: 'document-types',
    loadChildren: () => import('./document-types/document-type.module').then((m) => m.DocumentTypeModule)
  }
  // { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
