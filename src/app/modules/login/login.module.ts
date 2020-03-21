import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginModule { }
