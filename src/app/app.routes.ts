import { Routes } from '@angular/router';
import { UsersComponent } from './users/feature/users.component';

export const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: '**',
        redirectTo: 'users',
    }
];
