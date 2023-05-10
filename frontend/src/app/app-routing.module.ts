import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBasicComponent } from './app-basic/app-basic.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    component: AppBasicComponent,
    children: [
      {
        path: 'users/list',
        component: ListUserComponent,
      },
      {
        path: 'user/create',
        component: CreateUserComponent
      }
    ]},
  {path: '**' , redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
