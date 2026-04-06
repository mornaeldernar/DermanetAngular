export interface PermissionFlags {
    read: boolean;
    write: boolean;
    create: boolean;
    delete: boolean;
    import: boolean;
    export: boolean;
}

export interface ModulePermission {
    moduleId: number;
    moduleName: string;
    displayName: string;
    canRead: boolean;
    canWrite: boolean;
    canCreate: boolean;
    canDelete: boolean;
    canImport: boolean;
    canExport: boolean;
}

export interface Role {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    permissions: ModulePermission[];
}

export interface CreateRoleDto {
    name: string;
    description?: string;
    permissions: ModulePermission[];
}

export interface UpdateRoleDto {
    name: string;
    description?: string;
    isActive: boolean;
    permissions: ModulePermission[];
}

export interface Module {
    id: number;
    name: string;
    displayName: string;
    description?: string;
    isActive: boolean;
    order: number;
}
