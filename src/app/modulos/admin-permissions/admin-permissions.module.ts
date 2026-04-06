import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: RoleListComponent },
    { path: 'create', component: RoleFormComponent },
    { path: 'edit/:id', component: RoleFormComponent }
];

@NgModule({
    declarations: [
        RoleListComponent,
        RoleFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminPermissionsModule { }
