import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role.model';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    roles: Role[] = [];

    constructor(private roleService: RoleService, private router: Router) { }

    ngOnInit(): void {
        this.loadRoles();
    }

    loadRoles(): void {
        this.roleService.getRoles().subscribe((data) => (this.roles = data));
    }

    editRole(id: number): void {
        this.router.navigate(['admin-permissions/edit', id]);
    }

    deleteRole(id: number): void {
        if (confirm('Are you sure you want to delete this role?')) {
            this.roleService.deleteRole(id).subscribe(() => this.loadRoles());
        }
    }

    createRole(): void {
        this.router.navigate(['admin-permissions/create']);
    }
}
