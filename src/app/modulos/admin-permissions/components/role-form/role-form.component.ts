import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { Module, ModulePermission, CreateRoleDto, UpdateRoleDto } from '../../models/role.model';

@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
    roleForm: FormGroup;
    roleId: number | null = null;
    modules: Module[] = [];
    isEditMode = false;
    isLoading = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private roleService: RoleService
    ) {
        this.roleForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: [''],
            isActive: [true]
        });
    }

    ngOnInit(): void {
        this.roleId = Number(this.route.snapshot.paramMap.get('id')) || null;
        this.isEditMode = !!this.roleId;

        this.loadModules();
    }

    loadModules(): void {
        this.roleService.getModules().subscribe({
            next: (modules) => {
                this.modules = modules;
                if (this.roleId) {
                    this.loadRole();
                } else {
                    this.isLoading = false;
                }
            },
            error: (error) => {
                console.error('Error loading modules:', error);
                this.isLoading = false;
            }
        });
    }

    loadRole(): void {
        if (!this.roleId) return;

        this.roleService.getRole(this.roleId).subscribe({
            next: (role) => {
                this.roleForm.patchValue({
                    name: role.name,
                    description: role.description,
                    isActive: role.isActive
                });

                // Update module permissions based on loaded role
                this.modules.forEach(module => {
                    const permission = role.permissions.find(p => p.moduleId === module.id);
                    if (permission) {
                        this.updateModulePermission(module.id, permission);
                    }
                });

                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading role:', error);
                this.isLoading = false;
            }
        });
    }

    modulePermissions: { [moduleId: number]: ModulePermission } = {};

    initializeModulePermission(module: Module): void {
        if (!this.modulePermissions[module.id]) {
            this.modulePermissions[module.id] = {
                moduleId: module.id,
                moduleName: module.name,
                displayName: module.displayName,
                canRead: false,
                canWrite: false,
                canCreate: false,
                canDelete: false,
                canImport: false,
                canExport: false
            };
        }
    }

    updateModulePermission(moduleId: number, permission: Partial<ModulePermission>): void {
        const module = this.modules.find(m => m.id === moduleId);
        if (module) {
            this.initializeModulePermission(module);
            this.modulePermissions[moduleId] = { ...this.modulePermissions[moduleId], ...permission };
        }
    }

    toggleModuleAccess(module: Module, enabled: boolean): void {
        this.initializeModulePermission(module);
        if (enabled) {
            // Enable all permissions when module is enabled
            this.modulePermissions[module.id] = {
                ...this.modulePermissions[module.id],
                canRead: true,
                canWrite: true,
                canCreate: true,
                canDelete: true,
                canImport: true,
                canExport: true
            };
        } else {
            // Disable all permissions when module is disabled
            this.modulePermissions[module.id] = {
                ...this.modulePermissions[module.id],
                canRead: false,
                canWrite: false,
                canCreate: false,
                canDelete: false,
                canImport: false,
                canExport: false
            };
        }
    }

    isModuleEnabled(module: Module): boolean {
        const perm = this.modulePermissions[module.id];
        return perm && (perm.canRead || perm.canWrite || perm.canCreate || perm.canDelete || perm.canImport || perm.canExport);
    }

    togglePermission(module: Module, permission: keyof ModulePermission): void {
        this.initializeModulePermission(module);
        const perm = this.modulePermissions[module.id];
        const key = permission as 'canRead' | 'canWrite' | 'canCreate' | 'canDelete' | 'canImport' | 'canExport';
        perm[key] = !perm[key];
    }

    onSubmit(): void {
        if (this.roleForm.invalid) {
            this.roleForm.markAllAsTouched();
            return;
        }

        const permissions = Object.values(this.modulePermissions).filter(p =>
            p.canRead || p.canWrite || p.canCreate || p.canDelete || p.canImport || p.canExport
        );

        if (this.isEditMode && this.roleId) {
            const updateDto: UpdateRoleDto = {
                name: this.roleForm.value.name,
                description: this.roleForm.value.description,
                isActive: this.roleForm.value.isActive,
                permissions
            };

            this.roleService.updateRole(this.roleId, updateDto).subscribe({
                next: () => this.router.navigate(['/admin-permissions']),
                error: (error) => console.error('Error updating role:', error)
            });
        } else {
            const createDto: CreateRoleDto = {
                name: this.roleForm.value.name,
                description: this.roleForm.value.description,
                permissions
            };

            this.roleService.createRole(createDto).subscribe({
                next: () => this.router.navigate(['/admin-permissions']),
                error: (error) => console.error('Error creating role:', error)
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/admin-permissions']);
    }
}
