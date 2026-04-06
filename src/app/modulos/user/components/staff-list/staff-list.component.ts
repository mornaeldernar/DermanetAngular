import { Component, OnInit } from '@angular/core';
import { StaffService, StaffMember } from 'src/app/services/api/staff.service';

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
    staffMembers: StaffMember[] = [];
    filteredStaff: StaffMember[] = [];
    searchTerm: string = '';
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(private staffService: StaffService) { }

    ngOnInit(): void {
        this.loadStaff();
    }

    loadStaff(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.staffService.getAllStaff().subscribe({
            next: (data) => {
                this.staffMembers = data;
                this.filteredStaff = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading staff:', error);
                this.errorMessage = 'Error al cargar el personal. Por favor, intente nuevamente.';
                this.isLoading = false;
            }
        });
    }

    filterStaff(): void {
        if (!this.searchTerm.trim()) {
            this.filteredStaff = this.staffMembers;
            return;
        }

        const term = this.searchTerm.toLowerCase().trim();
        this.filteredStaff = this.staffMembers.filter(staff =>
            staff.firstName.toLowerCase().includes(term) ||
            staff.lastName.toLowerCase().includes(term) ||
            staff.email.toLowerCase().includes(term) ||
            staff.role.toLowerCase().includes(term)
        );
    }

    getFullName(staff: StaffMember): string {
        return `${staff.firstName} ${staff.lastName}`;
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getRoleBadgeClass(role: string): string {
        switch (role.toLowerCase()) {
            case 'recepcionista':
                return 'badge-info';
            case 'nurse':
            case 'enfermera':
                return 'badge-success';
            default:
                return 'badge-secondary';
        }
    }

    getHeaderClass(role: string): string {
        switch (role.toLowerCase()) {
            case 'recepcionista':
                return 'bg-gradient-info';
            case 'nurse':
            case 'enfermera':
                return 'bg-gradient-success';
            default:
                return 'bg-gradient-secondary';
        }
    }

    getRoleIcon(role: string): string {
        switch (role.toLowerCase()) {
            case 'recepcionista':
                return 'fas fa-user-tie';
            case 'nurse':
            case 'enfermera':
                return 'fas fa-user-nurse';
            default:
                return 'fas fa-user';
        }
    }

    toggleStatus(staff: StaffMember): void {
        const action = staff.enabled ? 'desactivar' : 'activar';
        const confirmation = confirm(`¿Está seguro que desea ${action} a ${this.getFullName(staff)}?`);

        if (!confirmation) {
            return;
        }

        this.staffService.toggleStaffStatus(staff.id).subscribe({
            next: (response) => {
                // Update the staff member status in the local array
                staff.enabled = response.enabled;
                console.log(response.message);
            },
            error: (error) => {
                console.error('Error toggling staff status:', error);
                alert('Error al actualizar el estado del personal. Por favor, intente nuevamente.');
            }
        });
    }
}
