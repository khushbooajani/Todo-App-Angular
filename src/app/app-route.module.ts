import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TodolistComponent } from './todolist/todolist.component';
import { ProfileEditComponent } from './user/profile/profile-edit/profile-edit.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const routes: Routes = [
    {
        path:'',
        redirectTo: '/user/signin',
        pathMatch: 'full'
    },
    {
        path:'user/signin',
        component: SignInComponent
    },
    {
        path:'user/signup',
        component: SignUpComponent
    },
    {
        path:'todolist',
        component: TodolistComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'user/editprofile',
        component: ProfileEditComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRouteModule { }