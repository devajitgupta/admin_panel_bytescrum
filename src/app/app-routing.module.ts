import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUserComponent } from './dashboard/register-user/register-user.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { AuthGuard } from './gaurd/auth.guard';
import { EmployeeDetailsComponent } from './dashboard/employee-details/employee-details.component';
import { AllManagerRoutesComponent } from './dashboard/all-manager-routes/all-manager-routes.component';
const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'dashboard',component:DashboardComponent},
  {path:'register-user', component:RegisterUserComponent},
  {path:'all-users' , component:AllUsersComponent},
  {path:'login' , component:DashboardComponent},
  //{path:'employee-details' , component:EmployeeDetailsComponent},
  {path:'employee-details', component:EmployeeDetailsComponent},
  {path:'manager' , component:AllManagerRoutesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
